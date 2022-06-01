const pool = require("../db");

const getUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users;");
  return rows;
};

const getUsersByUsername = async (nameToFind) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username ILIKE $1;",
    [nameToFind]
  );
  return rows;
};

const getUserById = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1;", [
    userId,
  ]);
  return rows[0];
};

const createUser = async ({ username }) => {
  const { rows } = await pool.query(
    "INSERT INTO users (username) VALUES ($1) RETURNING *;",
    [username]
  );
  return rows[0];
};

const deleteUserById = async (userId) => {
  const { rows } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *;",
    [userId]
  );
  return rows[0];
};

module.exports = {
  getUsers,
  getUsersByUsername,
  createUser,
  deleteUserById,
  getUserById,
};
