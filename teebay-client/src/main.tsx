import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import client from "./apollo/apolloClient.ts";
import { AuthProvider } from "./context/authContext.tsx";
import "./index.css";
import { router } from "./routes/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <MantineProvider>
        <Notifications />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MantineProvider>
    </StrictMode>
  </ApolloProvider>
);
