import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ length: 100, nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ length: 14, nullable: false, unique: true })
  cnpj!: string;

  @Column({ name: "role_id", nullable: false })
  role_id!: number;

  @Column({ default: true })
  active!: boolean;

  @Column({ name: "created_at", type: "timestamp", default: () => "NOW()" })
  created_at!: Date;

  @Column({ name: "updated_at", type: "timestamp", default: () => "NOW()" })
  updated_at!: Date;
}
