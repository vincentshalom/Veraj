import express from "express";
import { order } from "../controllers/ordersController.js";

const router = express.Router();

router.route("/").get(order.getAllOrders).post(order.createOrder);
router
  .route("/:id")
  .get(order.getOrder)
  .patch(order.updateOrder)
  .delete(order.deleteOrder);

export default router;
