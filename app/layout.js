import "../styles/globals.css";
import NextAuthenticationProvider from "@/components/NextAuthenticationProvider";

export const metadata = {
  title: "Spellbound",
  description: "Online spelling bee game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthenticationProvider>{children}</NextAuthenticationProvider>
      </body>
    </html>
  );
}
