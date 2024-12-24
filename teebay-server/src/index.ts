import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user.service";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
  });

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req, res }) => {
        const token = req.headers.authorization || "";
        try {
          const user = await UserService.decodeJWTToken(token);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
