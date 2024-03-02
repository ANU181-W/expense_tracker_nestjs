import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Decimal128,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  type: string;

  @Column()
  category: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;
}