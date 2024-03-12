import { Controller, Get, UseGuards, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { AdminService } from 'src/admin/admin.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminservice: AdminService,
  ) {}

  @Get()
  async getalluserbyid(@Request() req) {
    const id = req.user.user.id;

    let users = await this.userService.getuserbyid(id);
    return users;
  }

  @Get('/all')
  async getallusers(@Request() req) {
    const id = req.user.user.id;

    let users = await this.adminservice.getallusers(id);

    return users;
  }

  @Get('/search')
  async searchusers(@Request() req, @Query('keyword') keyword: string) {
    const id = req.user.user.id;
    let users = await this.userService.searchusers(id, keyword);

    return users;
  }
}
