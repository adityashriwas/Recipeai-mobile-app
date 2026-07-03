import express from "express";
import z from "zod";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  categoryId: z.string(),
});

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().nonnegative().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().optional(),
});

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", validate(productSchema), createProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
