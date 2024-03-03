import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto/create-transaction.dto';
import { Request } from 'express';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { paymentDto } from './dto/Payment-dto';
import { EntityManager } from 'typeorm';

interface AuthenticatedRequest extends Request {
  user: {
    [x: string]: any;
    id: number;
  }; // Modify this according to your actual user object structure
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
  getalltransactions(@Req() req: Request) {
    //@ts-ignore
    return this.transactionService.getalltransactions(req.user.user.id);
  }

  @Post('payment')
  processPayment(@Req() req: Request, @Body() paymentDto: paymentDto) {
    //@ts-ignore
    const userId = req.user.user.id;

    paymentDto.senderId = userId;
    return this.transactionService.processPayment(paymentDto);
  }

  @Get('/usertouser')
  async usertouser(@Req() req: AuthenticatedRequest) {
    const userId = req.user.user.id;
    console.log('user_id', userId);
    //console.log('user_id', userId);
    return this.transactionService.getallusertransactions(userId);
  }
}
