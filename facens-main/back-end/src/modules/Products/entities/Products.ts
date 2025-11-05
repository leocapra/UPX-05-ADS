import { Categories } from "../../Category/entities/Categories";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("products")
export class Products {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  code!: string;

  @Column({ type: "varchar", nullable: true })
  barcode!: string | undefined;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // Relação com categorias
  @ManyToOne(() => Categories, (category) => category.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category!: Categories;

  @Column({ name: "category_id" })
  category_id!: number;
}
