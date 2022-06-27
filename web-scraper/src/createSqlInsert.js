const { writeFile } = require("fs/promises");

/*
 * For each column, go through the row in the order
 * of the columns, surrounding it with single quotes if
 * is a string, and join those values together with commas. Then
 * surround the whole thing with ()'s.
 */
function generateValueLine(row, columns) {
  return (
    "(" +
    columns
      .map(column => {
        const value = row[column];
        if (typeof value === "string") {
          return `'${value}'`;
        }

        return value;
      })
      .join(",") +
    ")"
  );
}

module.exports = async function createSqlInsert(path, table, rows) {
  console.log(rows);
  const columns = Object.keys(rows[0]);

  let sql = `INSERT INTO ${table}
(${columns.join(",")})
VALUES
`;

  sql += rows.map(row => generateValueLine(row, columns)).join(`,
    `);

  await writeFile(path, sql);
};
