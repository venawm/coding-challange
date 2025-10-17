import { usePreferences } from "../../context/UserPreferencesContext";

const SortControls: React.FC = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = usePreferences();

  return (
    <>
      <select
        className="select select-sm bg-base-200 border-0 rounded-lg"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="email">Email</option>
      </select>
      <button
        className="btn btn-sm bg-base-200 border-0 rounded-lg"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
      </button>
    </>
  );
};

export default SortControls;
