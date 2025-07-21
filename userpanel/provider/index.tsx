import Header from "@/modules/Header";
import { QueryProvider } from "@/query";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <Header />
        <main className="site-main mt-[99px]">{children}</main>
      </QueryProvider>
    </>
  );
};

export default Layout;
