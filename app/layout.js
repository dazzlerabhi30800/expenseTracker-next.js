import "./globals.css";
import { Outfit } from "next/font/google";
import { ClerkProvider, RedirectToSignIn, SignedOut } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased`}>
          <Toaster />
          {children}
          <SignedOut>
            <RedirectToSignIn signInForceRedirectUrl="/" />
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
