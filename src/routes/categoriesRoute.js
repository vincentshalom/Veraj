import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { category } from "../controllers/categoriesController.js";

const router = express.Router();

router.use(authMiddleware.authenticate);
router.use(authMiddleware.authorise("admin"));

router.route("/").get(category.getAllCategories).post(category.createCategory);
router
  .route("/:id")
  .get(category.getCategory)
  .patch(category.updateCategory)
  .delete(category.deleteCategory);

export default router;
