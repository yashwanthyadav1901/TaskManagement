const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/userController");

router
  .route("/user")
  .get(UserController.getAllUsers)
  .post(UserController.createNewUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
