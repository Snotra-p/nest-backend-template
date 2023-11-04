import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({
    comment: '유저 아이디',
    unsigned: true,
  })
  id: number;

  @Column({ comment: '방장 아이디', unsigned: true })
  phoneNumber: number;
}
