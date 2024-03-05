import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';
import { AdminService } from 'src/admin/admin.service';
import { AuthenticatedRequest } from 'src/Type';

@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminservice: AdminService,
  ) {}

  @Get()
  async getalluserbyid(@Req() req: AuthenticatedRequest) {
    const id = req.user.user.id;
    console.log('user id:', id);
    let users = await this.userService.getuserbyid(id);
    return users;
  }

  @Get('/all')
  async getallusers(@Req() req: AuthenticatedRequest) {
    const id = req.user.user.id;
    console.log('user id:', id);

    let users = await this.adminservice.getallusers(id);

    return users;
  }
}
