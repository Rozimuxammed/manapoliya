import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <div className="hidden sm:block">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
      <div className="sm:hidden fixed bottom-0 left-0 w-full z-50 bg-background border-t">
        <Navbar />
      </div>
    </>
  );
}
