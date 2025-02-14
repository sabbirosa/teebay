import { ContextType } from "../..";
import TransactionService, {
  TransactionPayload,
} from "../../services/transaction.service";

const queries = {
  // Get all products the user has sold
  getProductsSold: async (
    _: unknown,
    args: { userId: string },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    return TransactionService.getProductsSold(args.userId);
  },

  // Get all products the user has bought
  getProductsBought: async (
    _: unknown,
    args: { userId: string },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    return TransactionService.getProductsBought(args.userId);
  },

  // Get all products the user has lent out
  getProductsLent: async (
    _: unknown,
    args: { userId: string },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    return TransactionService.getProductsLent(args.userId);
  },

  // Get all products the user has borrowed
  getProductsBorrowed: async (
    _: unknown,
    args: { userId: string },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");
    return TransactionService.getProductsBorrowed(args.userId);
  },
};

const mutations = {
  // Buy a product
  buyProduct: async (
    _: unknown,
    args: { productId: string; customerId: string },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");

    const payload: TransactionPayload = {
      productId: args.productId,
      customerId: args.customerId,
      transactionType: "BUY",
      rentTimeFrom: new Date(),
      rentTimeTo: new Date(),
    };

    return TransactionService.buyProduct(payload);
  },

  // Rent a product
  rentProduct: async (
    _: unknown,
    args: {
      productId: string;
      customerId: string;
      rentTimeFrom: Date;
      rentTimeTo: Date;
    },
    context: ContextType
  ) => {
    if (!context || !context.user) throw new Error("Unauthorized");

    const payload: TransactionPayload = {
      productId: args.productId,
      customerId: args.customerId,
      transactionType: "RENT",
      rentTimeFrom: args.rentTimeFrom,
      rentTimeTo: args.rentTimeTo,
    };

    return TransactionService.rentProduct(payload);
  },
};

export const resolvers = {
  queries,
  mutations,
};
