import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/Entities/transaction.entity';
import { User } from 'src/Entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, User])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
