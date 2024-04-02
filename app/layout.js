"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material";

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
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
