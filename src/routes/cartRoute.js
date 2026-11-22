import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { cart } from "../controllers/cartController.js";

const router = express.Router();

router.use(authMiddleware.authenticate);
router.use(authMiddleware.authorise("user"));

router.route("/").post(cart.createCart);
router
  .route("/:id")
  .get(cart.getCart)
  .patch(cart.updateCart)
  .delete(cart.deleteCart);
