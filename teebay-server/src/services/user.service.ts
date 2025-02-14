import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export interface RegisterUserPayload {
  firstName: string;
  lastName?: string;
  address?: string;
  email: string;
  phoneNo?: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

class UserService {
  private static async getUserByEmail(email: string) {
    try {
      return await prismaClient.user.findUnique({
        where: { email },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Database query failed:", error.message);
        throw new Error("Internal server error. Please try again later.");
      }
      throw new Error(
        "An unexpected error occurred during the database query."
      );
    }
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
    });
  }

  public static decodeJWTToken(token: string) {
    try {
      return JWT.verify(token, JWT_SECRET);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error decoding JWT token:", error.message);
        throw new Error("Invalid token. Please log in again.");
      }
      throw new Error("An unexpected error occurred during token decoding.");
    }
  }

  public static async registerUser(payload: RegisterUserPayload) {
    const { firstName, lastName, address, email, phoneNo, password } = payload;

    try {
      const existingUser = await this.getUserByEmail(email);

      if (existingUser) throw new Error("User with this email already exists.");

      if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[!@#$%^&*]/.test(password)
      ) {
        throw new Error(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prismaClient.user.create({
        data: {
          firstName,
          lastName: lastName || null,
          address: address || null,
          email,
          phoneNo: phoneNo || null,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating user:", error.message);
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred during registration.");
    }
  }

  public static async loginUser(payload: LoginUserPayload) {
    const { email, password } = payload;

    try {
      const user = await this.getUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password.");
      }

      const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return token;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in user:", error.message);
        throw error;
      }
      throw new Error("An unexpected error occurred during login.");
    }
  }
}

export default UserService;
