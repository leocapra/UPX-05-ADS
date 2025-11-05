import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableProducts1758167210991 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "products",
      new TableColumn({
        name: "price",
        type: "decimal",
        precision: 10, // até 99999999.99
        scale: 2,      // duas casas decimais
        isNullable: false,
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("products", "price");
  }
}
