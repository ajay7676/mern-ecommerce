import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata = {
  title: {
    default: "Valid Super Store",
    template: "%s | Valid Super Store",
  },
  description:
    "Shop fashion, footwear, beauty products and lifestyle essentials.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title.default}</title>
      </head>
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
};

export default RootLayout;
