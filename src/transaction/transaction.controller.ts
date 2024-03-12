import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { paymentDto } from './dto/Payment-dto';

@Controller('transaction')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    const { id } = req.user.user;
    return this.transactionService.createTransaction(createTransactionDto, id);
  }

  @Get()
  getalltransactions(@Request() req) {
    return this.transactionService.getalltransactions(req.user.user.id);
  }

  @Post('payment')
  processPayment(@Request() req, @Body() paymentDto: paymentDto) {
    const userId = req.user.user.id;

    paymentDto.senderId = userId;
    return this.transactionService.processPayment(paymentDto);
  }

  @Get('/usertouser')
  async usertouser(@Request() req) {
    const userId = req.user.user.id;
    return this.transactionService.getallusertransactions(userId);
  }

  @Get('/pagination')
  async pagination(@Request() req) {
    const userId = req.user.user.id;

    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 5;

    const transactions =
      await this.transactionService.paginateusertousertransactions(
        userId,
        page,
        pagesize,
      );
     
    return transactions;
  }
}
