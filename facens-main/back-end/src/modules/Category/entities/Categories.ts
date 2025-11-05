import { ProductClass } from "../../ProductClass/entities/ProductClass";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn()
  id!: number;  

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  description!: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Column({ type: "int" })
  product_class_id!: number; // coluna da FK

  @ManyToOne(() => ProductClass, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_class_id" })
  productClass!: ProductClass; // relação Many-to-One

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
