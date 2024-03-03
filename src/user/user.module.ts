import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { TransactionEntity } from 'src/Entities/transaction.entity';
import { LocalStrategy } from 'src/Auth/local.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User, TransactionEntity, LocalStrategy])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
