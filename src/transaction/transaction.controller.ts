import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';
import { Request } from 'express';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { paymentDto } from './dto/Payment-dto';
import { EntityManager } from 'typeorm';

interface UserDTo {
  id: number;
}

@Controller('transaction')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const id = req.user.user.id;
    console.log('user_id', id);
    return this.transactionService.createTransaction(createTransactionDto, id);
  }

  @Get()
  getalltransactions(@Req() req: Request & { user: UserDTo }) {
    const id: number = req.user.id;
    return this.transactionService.getalltransactions(id);
  }

  @Post('payment')
  processPayment(@Req() req: Request, @Body() paymentDto: paymentDto) {
    //@ts-ignore
    const userId = req.user.user.id;
    console.log('user_id', userId);

    //paymentDto.senderId = userId;
    return this.transactionService.processPayment(paymentDto);
  }
}
