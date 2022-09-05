import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Property } from "./properties.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Property, (prop) => prop.category)
  property: Property[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
