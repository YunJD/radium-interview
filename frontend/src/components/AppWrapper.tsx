import React from "react";
import "../index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();
type AppWrapperProps = {
  children: React.ReactNode;
};
const AppWrapper = ({ children }: AppWrapperProps) => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      {children}
    </QueryClientProvider>
  </React.StrictMode>
);

export default AppWrapper;
