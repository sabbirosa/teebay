import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user.service";

export interface ContextType {
  user?: {
    id: string;
    role: string;
  };
  token?: string;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.json({ message: "Server is running! 🥳" });
  });

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return { user: null };
        }

        const token = authHeader.replace("Bearer ", "");

        try {
          const user = await UserService.decodeJWTToken(token);
          return { user };
        } catch (error) {
          console.error("Error decoding JWT token:", error);
          return { user: null };
        }
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
