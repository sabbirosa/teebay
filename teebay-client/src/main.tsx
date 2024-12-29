import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import client from "./apollo/apolloClient.ts";
import Loading from "./components/LoadingComponent.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import "./index.css";
import { router } from "./routes/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <MantineProvider>
      <Notifications />
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </MantineProvider>
  </ApolloProvider>
);
