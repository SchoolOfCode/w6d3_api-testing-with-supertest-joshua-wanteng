const { Router } = require("express");
const router = Router();
const { getUsers, getUserById } = require("../models/users");

router.get("/", (req, res) => {
  const users = getUsers();

  res.json({
    success: true,
    payload: users,
  });
});

router.get("/:id", (req, res) => {
  const idToFind = Number(req.params.id);
  const matchingUser = getUserById(idToFind);

  if (!matchingUser) {
    return res.status(404).json({
      success: false,
      reason: `No user with ID ${idToFind} was found.`,
    });
  }

  res.json({
    success: true,
    payload: matchingUser,
  });
});

module.exports = router;
