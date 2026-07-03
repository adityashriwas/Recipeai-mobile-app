import express from "express";
import z from "zod";
import {
  getCategories,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

const categorySchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

router.get("/", getCategories);
router.delete("/:id", deleteCategory);
router.get("/:id/products", getProductsByCategory);
router.post("/", validate(categorySchema), createCategory);
router.put("/:id", validate(categorySchema), updateCategory);

export default router;
