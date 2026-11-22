import express from "express";
import { users } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Admin management route
// router.use(authMiddleware.authenticate);
// router.use(authMiddleware.authorise("admin"));

router.route("/").get(users.getAllUsers).post(users.createUser);
router
  .route("/:id")
  .get(users.getUser)
  .patch(users.updateUser)
  .delete(users.deleteUser);

export default router;
