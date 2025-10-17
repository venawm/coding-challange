import { useEffect, useState } from "react";
import type { User } from "../types";
import { api } from "../services/api";
import UserRow from "../components/ui/user-row";
import Pagination from "../components/ui/pagination";
import { usePreferences } from "../context/UserPreferencesContext";
import ItemsPerPageSelector from "../components/ui/item-per-page-selector";

const FavoritesPage: React.FC = () => {
  const { favorites, page, itemsPerPage, setPage } = usePreferences();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const loadFavorites = async () => {
    if (favorites.length === 0) {
      setUsers([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    try {
      const userPromises = favorites.map((id) =>
        fetch(`https://dummyjson.com/users/${id}`)
          .then((res) => res.json())
          .then((u) => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            phone: u.phone,
            image: u.image,
            company: { name: u.company?.name || "N/A" },
            role: u.role || "User",
          }))
          .catch(() => null)
      );

      const fetchedUsers = await Promise.all(userPromises);
      const validUsers = fetchedUsers.filter((u): u is User => u !== null);

      setTotal(validUsers.length);

      const start = (page - 1) * itemsPerPage;
      setUsers(validUsers.slice(start, start + itemsPerPage) as User[]);
    } catch (err) {
      console.error("Failed to load favorites:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [favorites, page, itemsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [favorites, setPage]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Favorite Users</h1>
          <p className="text-sm opacity-60 mt-1">
            {favorites.length} favorite{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-base-100 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">★</div>
          <p className="opacity-60 text-lg">No favorite users yet</p>
          <p className="opacity-40 text-sm mt-2">
            Add users to your favorites from the Users page
          </p>
        </div>
      ) : (
        <>
          <div className="bg-base-100 rounded-xl p-4 flex gap-3 flex-wrap items-center">
            <ItemsPerPageSelector />
          </div>

          <div className="bg-base-100 rounded-xl overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
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
                    <tbody onClick={() => window.location.reload()}>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <UserRow key={user.id} user={user} />
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="text-center py-8 opacity-60"
                          >
                            No users to display
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {total > 0 && <Pagination total={total} />}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
