const pool = require("../");

const dropUsersTable = async () => {
  await pool.query("DROP TABLE IF EXISTS users;");
  console.log("Dropped 'users' table");
};

module.exports = dropUsersTable;

if (require.main === module) {
  dropUsersTable()
    .catch(console.error)
    .finally(() => pool.end());
}
