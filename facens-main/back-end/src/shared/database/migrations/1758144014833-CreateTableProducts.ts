import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableProducts1758144014833 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment", // auto-increment
          },
          {
            name: "category_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "code",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "barcode",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
        onDelete: "CASCADE", // se apagar a categoria, apaga os produtos
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("products");
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("category_id") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("products", foreignKey);
    }
    await queryRunner.dropTable("products");
  }
}
