import type { User } from "../../types";

const UserRow: React.FC<{ user: User }> = ({ user }) => (
  <tr className="border-b border-base-300 hover:bg-base-200">
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

export default UserRow;
