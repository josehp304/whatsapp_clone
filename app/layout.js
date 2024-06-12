"use client";
import dynamic from "next/dynamic";

import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Page from "./page";
const Page = dynamic(() => import("./page"), { ssr: false });

// import GrpCard from "./grpCard";
const GrpCard = dynamic(() => import("./grpCard"), { ssr: false });
// import ChatContainer from "./chatContainer";
const ChatContainer = dynamic(() => import("./chatContainer"), { ssr: false });

// import { StateProvider } from "./StateProvider";

const StateProvider = dynamic(() => import("./StateProvider"), { ssr: false });
// import reducer, { initialState } from "./reducer";
const reducer = dynamic(
  () =>
    import("./reducer").then((mode) => ({
      default: mode.reducer,
      initialState: mode.initialState,
    })),
  { ssr: false }
);
// import ErrorPage from "./errorPage";
const ErrorPage = dynamic(() => import("./errorPage"), {
  ssr: false,
});
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#23824d",
    },
    secondary: {
      main: "#eaffe0",
      side: "#202c33",
      side2: "#111B21",
      side3: "#94a393",
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    children: [
      {
        path: "/test",
        element: <GrpCard />,
      },
      {
        path: "/chat/:contactId",
        element: <ChatContainer />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
export default function RootLayout({ children }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={theme}>
        <body>
          <RouterProvider router={router} />
        </body>
      </ThemeProvider>
    </StateProvider>
  );
}
