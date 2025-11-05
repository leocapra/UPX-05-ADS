import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterTableCategories1758080499876 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Adiciona a coluna product_class_id
    await queryRunner.addColumn(
      "categories",
      new TableColumn({
        name: "product_class_id",
        type: "int",
        isNullable: false, // ou true, dependendo se categorias já existentes podem ficar sem classe
      })
    );

    // 2️⃣ Cria a foreign key para product_classes
    await queryRunner.createForeignKey(
      "categories",
      new TableForeignKey({
        columnNames: ["product_class_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product_class",
        onDelete: "CASCADE", // se a classe for deletada, as categorias relacionadas também serão
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Pega a FK existente e remove
    const table = await queryRunner.getTable("categories");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("product_class_id") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("categories", foreignKey);
    }

    // 2️⃣ Remove a coluna
    await queryRunner.dropColumn("categories", "product_class_id");
  }
}
