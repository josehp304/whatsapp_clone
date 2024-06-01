"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./page";
import GrpCard from "./grpCard";
import ChatContainer from "./chatContainer";

const inter = Inter({ subsets: ["latin"] });

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
  },
]);
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <head>
          <title> Whatsapp</title>
          <link
            rel="icon"
            href="https://p7.hiclipart.com/preview/922/489/218/whatsapp-icon-logo-whatsapp-logo-png.jpg"
          />
        </head>
        <body className={inter.className}>
          <RouterProvider router={router} />
        </body>
      </ThemeProvider>
    </html>
  );
}
