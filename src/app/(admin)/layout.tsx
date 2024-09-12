
import type { Metadata } from "next";
import "../globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin Panel to Manage Personal Portfolio/blog Web app of and by Ravi Raina",
};

export default function AdminLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
        <body>
          <SessionProvider>
          {children}
          </SessionProvider>
         
        </body>
    </html>
  );
}
