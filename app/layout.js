import "../styles/globals.css";

export const metadata = {
  title: "Spellbound",
  description: "Online spelling bee game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
