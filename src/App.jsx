import React, { useEffect } from "react";
import { AppRouter } from "./router/AppRouter";
import { initializeTheme } from "./store/theme";

export const App = () => {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <AppRouter />;
};
