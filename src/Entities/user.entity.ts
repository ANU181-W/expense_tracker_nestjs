import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { UserTransaction } from './usertransaction';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];

  @OneToMany(() => UserTransaction, (transaction) => transaction.sender)
  sentTransactions: UserTransaction[];

  @OneToMany(() => UserTransaction, (transaction) => transaction.receiver)
  receivedTransactions: UserTransaction[];
}
