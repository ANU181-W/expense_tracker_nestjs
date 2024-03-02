import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RoleGuard } from 'src/role.guard';
import { AuthGuard } from '@nestjs/passport';

type Amount = {
  amount: number;
};

type UserID = {
  id: number;
};

@Controller('admin')
@UseGuards(AuthGuard('jwt'), new RoleGuard('admin'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/:id')
  async AddBalance(@Body() { amount }: Amount, @Param() { id }: UserID) {
    const user = await this.adminService.AddBalance(amount, id);

    return user;
  }

  @Get()
  async getallusers() {
    let users = await this.adminService.getallusers();
    return users;
  }
}
