import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

import { UserService } from './user/user.service';

import { CreateUserDto } from './user/dto/create-user.dto/create-user.dto';

@Controller('auth')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    console.log('appcontrollerlogin', req.user);
    let user = req.user;

    // remove user.password;
    delete user.password;

    // const user = "dbhfgijdebgjhd";
    const tokken = await this.authService.generateToken(user);

    return { token: tokken, role: user.role };
    
  }

  @Post('/register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    const user = await this.userService.getuser(CreateUserDto.email);
    console.log('appcontrollerregisteruser', user);
    if (user == null) {
      let newUser = await this.userService.createuser(CreateUserDto);
      console.log('appcontrollerregisternewuser', newUser);
      // delete newUser.password;
      return newUser;
    } else {
      return 'User already exists';
    }
  }
}
