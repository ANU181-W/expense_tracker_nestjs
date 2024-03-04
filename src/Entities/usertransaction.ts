import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,

} from 'typeorm';
import { User } from './user.entity';


@Entity()
export class UserTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.sentTransactions)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedTransactions)
  receiver: User;

  @Column()
  description: string;

  
  @Column()
  Receiverstatus: string;

 
  @Column()
  Senderstatus: string;
 
}
