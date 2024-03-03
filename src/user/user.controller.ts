import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { AdminService } from 'src/admin/admin.service';
export interface User {
  id: number;
}
@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminservice: AdminService,
  ) {}

  @Get()
  async getalluserbyid(@Req() req: Request) {
    //@ts-ignore

    const id = req.user.user.id;
    console.log('user id:', id);
    let users = await this.userService.getuserbyid(id);
    return users;
  }

  @Get('/all')
  async getallusers() {
    let users = await this.adminservice.getallusers();
    return users;
  }
}
