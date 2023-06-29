import Image from "next/image";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import Header from "@/components/header";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Lista de Paises",
  description: "Uma lista de paises criada com Next 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={nunito.className}>
        <main className="bg-gray-100 min-h-screen flex flex-col items-center"> 
          <Header 
          />
          {children}
        </main>
      </body>
    </html>
  );
}
