import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Property } from "./properties.entity";
import { User } from "./user.entity";

import { v4 as uuid } from "uuid";

@Entity("schedules")
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Property)
  property: Property;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
