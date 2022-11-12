import React, { type PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="flex min-h-screen flex-col bg-neutral-800 text-neutral-50">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Content;
