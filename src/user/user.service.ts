import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getuser(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async createuser(CreateUserDto: CreateUserDto) {
    let saltRounds:number = 10;
    let user = new User();
    user.email = CreateUserDto.email;
    user.password = await bcrypt.hash(CreateUserDto.password, saltRounds);
    user.role = CreateUserDto.role;
    user.name = CreateUserDto.name;
    console.log(user);
    return await this.userRepository.save(user);
  }

  async getuserbyid(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async searchusers(keyword: string) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.name like :keyword', { keyword: `%${keyword}%` })
      .getMany();
    return users;
  }
}
