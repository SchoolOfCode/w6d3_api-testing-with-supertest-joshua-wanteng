const { Router } = require("express");
const usersModel = require("../models/users");
const router = Router();

router.get("/", async (req, res, next) => {
  const { username } = req.query;
  if (!username) {
    return next();
  }

  const matchingUsers = await usersModel.getUsersByUsername(username);

  res.json({
    success: true,
    payload: matchingUsers,
  });
});

router.get("/", async (_, res) => {
  const users = await usersModel.getUsers();

  res.json({
    success: true,
    payload: users,
  });
});

router.get("/:id", async (req, res) => {
  const idToFind = req.params.id;
  const user = await usersModel.getUserById(idToFind);

  if (!user) {
    return res.status(404).json({
      success: false,
      reason: "No user with that ID was found!",
    });
  }

  res.json({
    success: true,
    payload: user,
  });
});

router.post("/", async (req, res) => {
  const { username } = req.body;
  const createdUser = await usersModel.createUser({ username });

  res.status(201).json({
    success: true,
    payload: createdUser,
  });
});

router.delete("/:id", async (req, res) => {
  const idToDelete = req.params.id;
  const deletedUser = await usersModel.deleteUserById(idToDelete);

  res.json({
    success: true,
    payload: deletedUser,
  });
});

module.exports = router;
