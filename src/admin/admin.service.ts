import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async AddBalance(amount: number, id: number) {
    const amt = (await this.userRepository.findOne({ where: { id: id } }))
      .balance;

    console.log(id);

    console.log(amount, amt);
    const user = await this.userRepository.update(
      {
        id,
      },
      { balance: amount + amt },
    );

    return user;
  }

  async getallusers() {
    let users = await this.userRepository.find({ where: { role: 'user' } });
    return users;
  }
}
