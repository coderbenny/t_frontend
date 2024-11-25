import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-center p-4">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TicketPal. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
