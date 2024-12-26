import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ProductPayload {
  title?: string;
  categories?: string;
  description?: string;
  purchasePrice?: number;
  rentPrice?: number;
  ownerId: string;
}

export class ProductService {
  // Create Product
  public static async createProduct(data: ProductPayload) {
    try {
      const product = await prisma.product.create({
        data,
      });
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error(
        error instanceof Error
          ? `Product creation failed: ${error.message}`
          : "An unexpected error occurred while creating the product."
      );
    }
  }

  // List All Products
  public static async getAllProducts() {
    try {
      return await prisma.product.findMany({
        include: {
          owner: true,
          transactions: true,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(
        error instanceof Error
          ? `Fetching products failed: ${error.message}`
          : "An unexpected error occurred while fetching the products."
      );
    }
  }

  // Get Product by ID
  public static async getProduct(id: string) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          owner: true,
          transactions: true,
        },
      });

      if (!product) throw new Error("Product not found");

      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error(
        error instanceof Error
          ? `Fetching product failed: ${error.message}`
          : "An unexpected error occurred while fetching the product."
      );
    }
  }

  // Edit Product
  public static async editProduct(id: string, data: Partial<ProductPayload>) {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data,
      });
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error(
        error instanceof Error
          ? `Updating product failed: ${error.message}`
          : "An unexpected error occurred while updating the product."
      );
    }
  }

  // Delete Product
  public static async deleteProduct(id: string) {
    try {
      return await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error(
        error instanceof Error
          ? `Deleting product failed: ${error.message}`
          : "An unexpected error occurred while deleting the product."
      );
    }
  }

  // Get Products by User ID
  public static async getProductsByUser(ownerId: string) {
    try {
      return await prisma.product.findMany({
        where: { ownerId },
        include: {
          transactions: true,
        },
      });
    } catch (error) {
      console.error("Error fetching user's products:", error);
      throw new Error(
        error instanceof Error
          ? `Fetching user's products failed: ${error.message}`
          : "An unexpected error occurred while fetching the user's products."
      );
    }
  }
}

export default ProductService;
