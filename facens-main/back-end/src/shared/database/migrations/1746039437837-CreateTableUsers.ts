import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1746039437837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            cnpj VARCHAR(20) NOT NULL UNIQUE,
            role_id INTEGER NOT NULL,
            active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            CONSTRAINT FK_user_role FOREIGN KEY (role_id) 
              REFERENCES roles(id) ON DELETE RESTRICT
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
