import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';
import { Transaction } from 'src/Entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/Entities/user.entity';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly Transaction: Repository<Transaction>,
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}

  async createTransaction(
    CreateTransactionDto: CreateTransactionDto,
    userId: number,
  ) {
    const transaction = new Transaction();
    transaction.amount = CreateTransactionDto.amount;
    transaction.type = CreateTransactionDto.type;
    transaction.category = CreateTransactionDto.category;
    transaction.name = CreateTransactionDto.name;
    const user = (transaction.user = await this.UserRepo.findOne({
      where: { id: userId },
    }));

    if (user.balance < transaction.amount) {
      throw new BadRequestException('Insufficient Balance');
    }

    await this.Transaction.save(transaction);

    user.balance = user.balance - transaction.amount;
    await this.UserRepo.save(user);
    return transaction;
  }

  async getalltransactions(userId: number) {
    let user = await this.UserRepo.findOne({ where: { id: userId } });
    let transactions = await this.Transaction.find({ where: { user: user } });
    return transactions;
  }
}
