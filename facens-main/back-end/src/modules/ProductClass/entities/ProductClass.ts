import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("product_class")
export class ProductClass {
  @PrimaryGeneratedColumn()
  id!: number;  

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  description!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
