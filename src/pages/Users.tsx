import { useEffect, useState } from "react";
import type { User, UsersResponse } from "../types";
import { api } from "../services/api";
import SearchBar from "../components/ui/searchbar";
import SortControls from "../components/ui/sort-controls";
import UserRow from "../components/ui/user-row";
import Pagination from "../components/ui/pagination";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data: UsersResponse = await api.fetchUsers({
        search,
        page,
        limit: 10,
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
  }, [page, sortBy, sortOrder]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      loadUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="bg-base-100 rounded-xl p-0 mb-4">
        <div className="flex gap-3 items-center flex-wrap">
          <SearchBar value={search} onChange={setSearch} />
          <SortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSortBy}
            onOrderToggle={() =>
              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
          />
        </div>
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
                    <th className="bg-base-100">User</th>
                    <th className="bg-base-100">Email</th>
                    <th className="bg-base-100">Phone</th>
                    <th className="bg-base-100">Company</th>
                    <th className="bg-base-100">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={page}
              total={total}
              limit={10}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default UsersPage;
