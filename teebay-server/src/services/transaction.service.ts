import { PrismaClient, Product, TransactionType, User } from "@prisma/client";

const prisma = new PrismaClient();

export interface TransactionPayload {
  id?: string;
  productId: string;
  customerId: string;
  transactionType: TransactionType;
  rentTimeFrom: Date;
  rentTimeTo: Date;
  product?: Product;
  customer?: User;
}

export class TransactionService {
  // Get all products the user has sold
  public static async getProductsSold(userId: string) {
    return prisma.transaction.findMany({
      where: {
        product: { ownerId: userId },
        transactionType: TransactionType.BUY,
      },
      include: { product: true, customer: true },
    });
  }

  // Get all products the user has bought
  public static async getProductsBought(userId: string) {
    return prisma.transaction.findMany({
      where: { customerId: userId, transactionType: TransactionType.BUY },
      include: { product: true, customer: true },
    });
  }

  // Get all products the user has lent out
  public static async getProductsLent(userId: string) {
    return prisma.transaction.findMany({
      where: {
        product: { ownerId: userId },
        transactionType: TransactionType.RENT,
      },
      include: { product: true, customer: true },
    });
  }

  // Get all products the user has borrowed
  public static async getProductsBorrowed(userId: string) {
    return prisma.transaction.findMany({
      where: { customerId: userId, transactionType: TransactionType.RENT },
      include: { product: true, customer: true },
    });
  }

  // Buy a product
  public static async buyProduct(payload: TransactionPayload) {
    const { productId, customerId } = payload;

    // Fetch the product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Check if the product is already sold
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        productId,
        transactionType: TransactionType.BUY,
      },
    });

    if (existingTransaction) {
      throw new Error("Product is already sold");
    }

    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        productId,
        customerId,
        transactionType: TransactionType.BUY,
        rentTimeFrom: new Date(), // Placeholder values
        rentTimeTo: new Date(), // Placeholder values
      },
    });

    // Fetch and return the transaction with product and customer included
    return prisma.transaction.findUnique({
      where: { id: transaction.id },
      include: { product: true, customer: true }, // Ensure customer is included
    });
  }

  // Rent a product
  public static async rentProduct(payload: TransactionPayload) {
    const { productId, customerId, rentTimeFrom, rentTimeTo } = payload;

    if (rentTimeFrom >= rentTimeTo) {
      throw new Error(
        "Invalid rent time: 'rentTimeFrom' must be earlier than 'rentTimeTo'"
      );
    }

    // Fetch the product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Check if the product is already rented for the requested period
    const overlappingRental = await prisma.transaction.findFirst({
      where: {
        productId,
        transactionType: TransactionType.RENT,
        OR: [
          {
            rentTimeFrom: { lte: rentTimeTo },
            rentTimeTo: { gte: rentTimeFrom },
          },
        ],
      },
    });

    if (overlappingRental) {
      throw new Error("Product is already rented for the requested period");
    }

    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        productId,
        customerId,
        transactionType: TransactionType.RENT,
        rentTimeFrom,
        rentTimeTo,
      },
    });

    // Fetch and return the transaction with product and customer included
    return prisma.transaction.findUnique({
      where: { id: transaction.id },
      include: { product: true, customer: true }, // Ensure customer is included
    });
  }
}

export default TransactionService;
