const SortControls: React.FC<{
  sortBy: string;
  sortOrder: string;
  onSortChange: (v: string) => void;
  onOrderToggle: () => void;
}> = ({ sortBy, sortOrder, onSortChange, onOrderToggle }) => (
  <>
    <select
      className="select select-sm bg-base-200 border-0 rounded-lg"
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="firstName">First Name</option>
      <option value="lastName">Last Name</option>
      <option value="email">Email</option>
    </select>
    <button
      className="btn btn-sm bg-base-200 border-0 rounded-lg"
      onClick={onOrderToggle}
    >
      {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
    </button>
  </>
);

export default SortControls;
