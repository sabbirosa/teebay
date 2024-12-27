import { ContextType } from "../..";
import { ProductPayload, ProductService } from "../../services/product.service";

const queries = {
  // Get a single product by ID
  getProduct: async (
    _: unknown,
    args: { id: string },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    return await ProductService.getProduct(args.id);
  },

  // Get all products
  getAllProducts: async (_: unknown, __: unknown, context: ContextType) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    return await ProductService.getAllProducts();
  },

  // Get all products of the logged-in user
  getUserProducts: async (_: unknown, __: unknown, context: ContextType) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    const userId = context.user.id;
    return await ProductService.getProductsByUser(userId);
  },
};

const mutations = {
  // Create a new product
  addProduct: async (
    _: unknown,
    payload: ProductPayload,
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    const userId = context.user.id;
    const productData = { ...payload, ownerId: userId };
    const res = await ProductService.addProduct(productData);
    return res;
  },

  // Edit an existing product
  editProduct: async (
    _: unknown,
    args: { id: string } & Partial<ProductPayload>,
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    const userId = context.user.id;

    // Verify the product belongs to the logged-in user
    const product = await ProductService.getProduct(args.id);
    if (!product || product.ownerId !== userId) {
      throw new Error("Unauthorized or Product not found");
    }

    return await ProductService.editProduct(args.id, args);
  },

  // Delete a product
  deleteProduct: async (
    _: unknown,
    args: { id: string },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    const userId = context.user.id;

    // Verify the product belongs to the logged-in user
    const product = await ProductService.getProduct(args.id);
    if (!product || product.ownerId !== userId) {
      throw new Error("Unauthorized or Product not found");
    }

    return await ProductService.deleteProduct(args.id);
  },

  // Increment the views of a product
  incrementViews: async (
    _: unknown,
    args: { id: string },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    return await ProductService.incrementViews(args.id);
  },
};

export const resolvers = {
  queries,
  mutations,
};
