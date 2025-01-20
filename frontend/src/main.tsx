import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/graphql/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/custom/themeProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </StrictMode>,
);
