import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col items-start px-6 py-4">
        <label
          htmlFor="my-drawer"
          className="btn btn-square btn-ghost mb-4 lg:hidden"
          aria-label="open sidebar"
        >
          <Menu />
        </label>

        {/* Main Content */}
        <main className="w-full max-w-7xl mx-auto">{children}</main>
      </div>

      {/* Sidebar Content */}
      <div className="drawer-side bg-base-100">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="w-64 min-h-full  border-r border-base-200">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
