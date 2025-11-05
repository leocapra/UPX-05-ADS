const { execSync } = require("child_process");

const name = process.argv[2];
if (!name) {
  console.error("❌ Informe o nome da migration");
  process.exit(1);
}

const path = `src/shared/database/migrations/${name}`;
execSync(`npx typeorm migration:create ${path}`, { stdio: "inherit" });
