import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/Entities/transaction.entity';
import { User } from 'src/Entities/user.entity';
import { UserTransaction } from 'src/Entities/usertransaction';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, User,UserTransaction])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
