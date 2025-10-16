import { UserIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <Sidebar onLogout={logout} />
        </div>
        <div className="drawer-content flex flex-col">
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
