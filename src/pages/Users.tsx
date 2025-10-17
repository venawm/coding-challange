import { useEffect, useState } from "react";
import type { User } from "../types";
import { api } from "../services/api";
import SearchBar from "../components/ui/searchbar";
import SortControls from "../components/ui/sort-controls";
import UserRow from "../components/ui/user-row";
import Pagination from "../components/ui/pagination";
import ItemsPerPageSelector from "../components/ui/item-per-page-selector";
import { usePreferences } from "../context/UserPreferencesContext";
import LoadingSpinner from "../components/ui/loader";

const UsersPage: React.FC = () => {
  const preferences = usePreferences();
  const {
    page,
    itemsPerPage,
    sortBy,
    sortOrder,
    search,
    setSearch,
    resetPreferences,
  } = preferences;

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await api.fetchUsers({
        search,
        page,
        limit: itemsPerPage,
        sortBy,
        sortOrder,
      });
      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, itemsPerPage, sortBy, sortOrder, search]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          className="btn btn-sm btn-outline rounded-lg"
          onClick={resetPreferences}
        >
          Reset Preferences
        </button>
      </div>

      <div className="bg-base-100 rounded-xl p-4 space-y-3">
        <SearchBar value={search} onChange={setSearch} />

        <div className="flex gap-3 flex-wrap">
          <SortControls />
          <ItemsPerPageSelector />
        </div>
      </div>

      <div className="bg-base-100 rounded-xl overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="border-b border-base-300">
                    <th className="bg-base-100 w-12">Favorite</th>
                    <th className="bg-base-100">User</th>
                    <th className="bg-base-100">Email</th>
                    <th className="bg-base-100">Phone</th>
                    <th className="bg-base-100">Company</th>
                    <th className="bg-base-100">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => <UserRow key={user.id} user={user} />)
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 opacity-60">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination total={total} />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
