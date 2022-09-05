import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";

import { v4 as uuid } from "uuid";
import { Schedule } from "./schedule.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Schedule, (sch) => sch.user)
  schedules: Schedule[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
