const pool = require("../");

const createUsersTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(30) NOT NULL
    );`
  );
  console.log("Created 'users' table");
};

module.exports = createUsersTable;

if (require.main === module) {
  createUsersTable()
    .catch(console.error)
    .finally(() => pool.end());
}
