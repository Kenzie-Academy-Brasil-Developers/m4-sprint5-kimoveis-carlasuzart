import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { Address } from "./addresses.entity";
import { Category } from "./category.entity";
import { v4 as uuid } from "uuid";
import { Schedule } from "./schedule.entity";

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Schedule, (sch) => sch.property)
  schedule: Schedule[];

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
