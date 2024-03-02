import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
export interface User {
  id: number;
}
@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getalluserbyid(@Req() req: Request) {
    //@ts-ignore

    const id = req.user.user.id;
    console.log('user id:', id);
    let users = await this.userService.getuserbyid(id);
    return users;
  }
}
