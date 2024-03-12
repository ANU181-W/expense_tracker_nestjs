import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';
import { TransactionEntity } from 'src/Entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, EntityManager, createQueryBuilder } from 'typeorm';
import { User } from 'src/Entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { paymentDto } from './dto/Payment-dto';
import { UserTransaction } from 'src/Entities/usertransaction';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly Transaction: Repository<TransactionEntity>,
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
    @InjectRepository(UserTransaction)
    private readonly UserTransaction: Repository<UserTransaction>,
  ) {}

  async createTransaction(
    CreateTransactionDto: CreateTransactionDto,
    userId: number,
  ) {
    const transaction = new TransactionEntity();
    transaction.amount = CreateTransactionDto.amount;
    transaction.description = CreateTransactionDto.description;
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

  async getUserById(userId: number, manager?: EntityManager) {
    return manager
      ? manager.findOne(User, { where: { id: userId } })
      : this.UserRepo.findOne({ where: { id: userId } });
  }

  async processPayment(paymentDto: paymentDto) {
    const { senderId, amount, receiverId, description } = paymentDto;
    const isReceived = true;
    const isSent = true;
    await this.UserRepo.manager.transaction(async (manager) => {
      const sender = await this.getUserById(senderId, manager);
      const receiver = await this.getUserById(receiverId, manager);
      if (!sender || !receiver) {
        throw new BadRequestException('Invalid sender or receiver');
      }

      if (sender.balance < amount) {
        throw new Error('Insufficient balance');
      }

      sender.balance -= amount;
      receiver.balance += amount;

      await manager.save(sender);
      await manager.save(receiver);
      const transaction = new UserTransaction();
      transaction.amount = amount;
      transaction.description = description;

      transaction.sender = sender;

      transaction.receiver = receiver;
      if (isReceived && isSent) {
        transaction.Receiverstatus = 'Credited';
        transaction.Senderstatus = 'Debited';
      }

      const receiverName = receiver.name;
      transaction.name = receiverName;

      await manager.save(transaction);
    });

    return { message: 'payment successful' };
  }

  async getallusertransactions(userId: number) {
    let user = await this.UserRepo.findOne({ where: { id: userId } });

    let transactions = await this.UserTransaction.find({
      where: { sender: user },
      order: {
        id: 'DESC',
      },
    });
    return transactions;
  }

  async paginateusertousertransactions(
    userId: number,
    pageno: number,
    pagesize: number,
  ) {
    const skip = (pageno - 1) * pagesize;
    const transactions = await this.UserTransaction.createQueryBuilder(
      'usertransaction',
    )
      .where('usertransaction.senderId = :senderId', { senderId: userId })
      .orderBy('usertransaction.id', 'DESC')
      .skip(skip)
      .take(pagesize)
      .getMany();
    return transactions;
  }

  async paginateexpenses(userId: number, pageno: number, pagesize: number) {
    const skip = (pageno - 1) * pagesize;
    const transactions = await this.Transaction.createQueryBuilder('transaction')
      .where('transaction.userId = :userId', { userId: userId })
      .orderBy('transaction.id', 'DESC')
      .skip(skip)
      .take(pagesize)
      .getMany();
    return transactions;
  }
}
