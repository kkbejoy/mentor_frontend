import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { RouterProvider } from "react-router-dom";
import { ApplicationBaseRoutes } from "./routes/ApplicationRoutesBase.tsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./componenets/General/Fallback/ErrorPage.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={ApplicationBaseRoutes} />
    </Provider>
  </React.StrictMode>
);
