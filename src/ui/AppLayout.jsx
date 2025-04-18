import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

function AppLayout() {
  const [isNavActive, setIsNavActive] = useState(false);

  return (
    <div>
      <Header isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
