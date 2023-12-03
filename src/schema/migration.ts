import mysql from "mysql";
import fs from "fs";
import dbml from "@dbml/core";

export async function initDb() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "db",
    insecureAuth: true,
    port: 13306,
    multipleStatements: true,
  });

  console.clear();
  connection.connect();

  const sqlFiles = loadFilesByExtension("./src/schema", ".sql");
  console.log(sqlFiles);

  // read sql files and execute
  for (const file of sqlFiles) {
    const sql = fs.readFileSync(`./src/schema/${file}`, "utf8");
    const dbmlFile = dbml.importer.import(sql, 'mysql');

    // write dbml file
    fs.writeFileSync(`./src/schema/${file.replace('.sql', '')}.dbml`, dbmlFile);

    connection.query(sql, function (error, results, fields) {
    //   if (error) throw error;
      console.log("Migration done: ", file);
    });
  }

  connection.query(
    "SELECT 1 + 1 AS solution",
    function (error, results, fields) {
      //   if (error) throw error;
      console.log("The solution is: ", results[0].solution);
    }
  );

  connection.end();
}

const loadFilesByExtension = (dir: string, extension: string) => {
  const files = fs.readdirSync(dir);
  return files.filter((file) => file.endsWith(extension));
};
