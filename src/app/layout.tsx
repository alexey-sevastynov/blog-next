import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import AuthProvider from "@/components/auth-provider/AuthProvider";
import "@uploadthing/react/styles.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { GlobalContextProvider } from "./Context/store";
import { Provider } from "react-redux";
import { store } from "./GlobalRedux/store";
import { Providers } from "./GlobalRedux/provider";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "My next app for create posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <AuthProvider>
          <GlobalContextProvider>
            <Providers>{children}</Providers>
          </GlobalContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
