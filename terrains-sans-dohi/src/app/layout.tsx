import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav-bar";
import Footer from "./components/footer";
import { UserProvider } from "@/contexts/user-context"; // <-- fix import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terrains100Dohi",
  description: "Trouvez votre terrain parfait",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <UserProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
