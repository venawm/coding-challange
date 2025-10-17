import { useNavigate } from "react-router-dom";
import type { User } from "../../types";
import { usePreferences } from "../../context/UserPreferencesContext";

const UserRow: React.FC<{ user: User }> = ({ user }) => {
  const { favorites, toggleFavorite } = usePreferences();
  const isFavorite = favorites.includes(user.id);

  return (
    <tr className="border-b border-base-300 hover:bg-base-200">
      <td>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => toggleFavorite(user.id)}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={user.image} alt={user.firstName} />
            </div>
          </div>
          <span className="font-medium">
            {user.firstName} {user.lastName}
          </span>
        </div>
      </td>
      <td className="opacity-80">{user.email}</td>
      <td className="opacity-80">{user.phone}</td>
      <td className="opacity-80">{user.company.name}</td>
      <td>
        <div className="badge badge-sm badge-ghost rounded-md">{user.role}</div>
      </td>
    </tr>
  );
};

export default UserRow;
