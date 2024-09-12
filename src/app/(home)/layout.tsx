import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Personal Blog - Ravi Raina",
  description: "Ravi's - Personal Blog",
};

export default function BlogLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
          {children}
        </body>
    </html>
  );
}
