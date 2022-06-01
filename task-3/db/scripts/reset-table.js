const pool = require("../index");
const createUsersTable = require("./create-table");
const dropUsersTable = require("./drop-table");
const seedUsersTable = require("./seed-table");

const resetUsersTable = async () => {
  await dropUsersTable();
  await createUsersTable();
  await seedUsersTable();
  console.log("Dropped, re-created and seeded 'users' table");
};

module.exports = resetUsersTable;

if (require.main === module) {
  resetUsersTable()
    .catch(console.error)
    .finally(() => pool.end());
}
