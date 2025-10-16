import { LogOut, UserCircle } from "lucide-react";

const Sidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <aside className="w-64 min-h-screen bg-base-100 p-4 flex flex-col">
    <div className="flex items-center gap-2 mb-8 px-2">
      <div className="w-8 h-8 bg-primary text-primary-content rounded-lg flex items-center justify-center font-bold">
        U
      </div>
      <span className="font-semibold text-lg">User Portal</span>
    </div>
    <ul className="menu p-0 text-sm flex-1">
      <li>
        <a className="rounded-lg flex items-center gap-2 bg-primary text-primary-content">
          <UserCircle className="w-4 h-4" />
          User
        </a>
      </li>
    </ul>
    <div className="px-2">
      <button
        onClick={onLogout}
        className="btn btn-sm btn-ghost w-full flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  </aside>
);
export default Sidebar;
