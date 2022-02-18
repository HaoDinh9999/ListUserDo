const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controller/userController");
router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router.route("/:name").get(userController.getUser);

router.route("/getUserId/:id").get(userController.getUserById);

router.route("/update/:id").post(userController.updateUser);
module.exports = router;
