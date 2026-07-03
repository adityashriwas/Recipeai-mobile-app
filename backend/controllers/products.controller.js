import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function getProducts(req, res) {
  const { categoryId, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const where = categoryId ? { categoryId } : {};
  const products = await prisma.product.findMany({
    include: { category: true },
    skip: +skip,
    take: +limit,
    where,
  });

  res.json(products);
}

async function getProductById(req, res) {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

async function createProduct(req, res) {
  const { name, description, price, categoryId, imageUrl } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, categoryId, imageUrl },
  });
  res.json(product);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  const product = await prisma.product.update({
    where: { id },
    data: { name, description, price, imageUrl },
  });
  res.json(product);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await prisma.product.delete({ where: { id } });
  res.json({ message: "Product deleted" });
}

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
