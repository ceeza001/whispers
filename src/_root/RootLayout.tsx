import { Outlet } from "react-router-dom";

import { Topbar, Footer } from "@/components/shared";

const RootLayout = () => {
  return (
    <div className="w-full">
      <Topbar />

      <section className="mt-[4rem]">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;