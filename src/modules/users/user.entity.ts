import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, name: 'first_name' })
  firstName: string;

  @Column({ length: 80, name: 'last_name' })
  lastName: string;

  @Column({ length: 80, name: 'email' })
  @Index({ unique: true })
  email: string;

  @Column({ length: 80, name: 'password' })
  password: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
