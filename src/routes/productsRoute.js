import express from "express";
import { product } from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(product.getAllProducts).post(product.createProduct);
router
  .route("/:id")
  .get(product.getProduct)
  .patch(product.updateProduct)
  .delete(product.deleteProduct);

export default router;
