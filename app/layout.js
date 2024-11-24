import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TicketPal",
  description:
    "Welcome to ticketpal, your event ticketing management system. You can create events and sell tickets from the website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        {/* <footer className="bg-base-100 text-center p-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TicketPal. All Rights Reserved.
          </p>
        </footer> */}
      </body>
    </html>
  );
}
