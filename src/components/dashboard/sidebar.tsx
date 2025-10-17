import { LogOut, UserCircle, StarIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeSwitcher from "../ui/theme-switch";

type MenuItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  // 1. Define a handler to close the drawer
  const handleLinkClick = () => {
    // We need to find the checkbox that controls the drawer
    const elem = document.getElementById("my-drawer") as HTMLInputElement;
    if (elem) {
      // Uncheck the checkbox to close the drawer
      elem.checked = false;
    }
  };

  const menuItems: MenuItem[] = [
    {
      href: "/dashboard/users",
      label: "Users",
      icon: <UserCircle className="w-5 h-5" />,
    },
    {
      href: "/dashboard/favourites",
      label: "Favourites",
      icon: <StarIcon className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="bg-base-100 text-base-content w-64 h-screen md:h-auto flex flex-col">
      {/* Logo / Header */}
      <div className="p-4 flex items-center gap-3 border-b border-base-200">
        <div className="w-10 h-10 bg-primary text-primary-content rounded-lg flex items-center justify-center font-bold text-xl">
          U
        </div>
        <span className="font-bold text-xl">User Portal</span> <ThemeSwitcher />
      </div>

      {/* Navigation Menu */}
      <ul className="menu p-4 flex-1 gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <li key={item.label} className="w-full">
              <Link
                to={item.href}
                // 2. Attach the click handler to each link
                onClick={handleLinkClick}
                className={`flex items-center gap-2 px-3 py-2  rounded-md ${
                  isActive
                    ? "bg-base-200 font-semibold hover:bg-base-300"
                    : "hover:bg-base-300"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Footer */}
      <div className="p-4 border-t border-base-200">
        <button
          className="btn btn-ghost w-full justify-start"
          onClick={() => logout()}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
