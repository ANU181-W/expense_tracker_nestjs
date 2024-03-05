import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { paymentDto } from './dto/Payment-dto';

import { AuthenticatedRequest } from 'src/Type';

@Controller('transaction')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const { id } = req.user.user;
    return this.transactionService.createTransaction(createTransactionDto, id);
  }

  @Get()
  getalltransactions(@Req() req: AuthenticatedRequest) {
    return this.transactionService.getalltransactions(req.user.user.id);
  }

  @Post('payment')
  processPayment(

    @Req() req: AuthenticatedRequest,
    @Body() paymentDto: paymentDto,
  ) {
    const userId = req.user.user.id;

    paymentDto.senderId = userId;
    return this.transactionService.processPayment(paymentDto);
  }

  @Get('/usertouser')
  async usertouser(@Req() req: AuthenticatedRequest) {
    const userId = req.user.user.id;
    
   
    return this.transactionService.getallusertransactions(userId);
  }
}
