import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.sentTransactions)
  sender: User;
  senderName: string;

  @ManyToOne(() => User, (user) => user.receivedTransactions)
  receiver: User;
  receiverName: string;

  // You can add more properties like timestamp, description, etc.
}
