/**
 * For simplicity and just while we're starting to test our APIs, we're back to using an in-memory array (rather than an actual database).
 */
const users = [
  { id: 0, username: "A" },
  { id: 1, username: "B" },
  { id: 2, username: "C" },
  { id: 3, username: "D" },
  { id: 4, username: "E" },
  { id: 5, username: "F" },
  { id: 6, username: "G" },
  { id: 7, username: "H" },
  { id: 8, username: "I" },
  { id: 9, username: "J" },
  { id: 10, username: "K" },
];

const getUsers = () => {
  return [...users];
};

const getUserById = (idToFind) => {
  return users.find((user) => user.id === idToFind);
};

module.exports = {
  getUsers,
  getUserById,
};
