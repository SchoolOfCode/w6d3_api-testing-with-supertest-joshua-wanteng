const pool = require("../");
const seedData = require("../seed-data");

const seedUsersTable = async () => {
  /**
   * Should be injection-resistant as we're just dynamically generating N placeholders (where N is how many items we're seeding).
   *
   * (Plus, we control the seed data. It hasn't come from the user/some third party/someone we can't trust/control.)
   */
  const placeholders = seedData.map((_, i) => `($${i + 1})`).join(",\n");
  const values = seedData.map((user) => user.username);

  await pool.query(
    `INSERT INTO users (username) VALUES ${placeholders};`,
    values
  );

  console.log("Seeded 'users' table");
};

module.exports = seedUsersTable;

if (require.main === module) {
  seedUsersTable()
    .catch(console.error)
    .finally(() => pool.end());
}
