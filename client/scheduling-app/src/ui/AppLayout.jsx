import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function AppLayout({ context }) {
  const { accountStatus, user } = context;
  return (
    <div className="flex min-h-screen flex-col bg-stone-500">
      <Navbar context={{ accountStatus, user }} />
      <Outlet context={{ accountStatus, user }} />
    </div>
  );
}

export default AppLayout;
