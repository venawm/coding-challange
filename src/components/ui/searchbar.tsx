const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => (
  <input
    type="text"
    placeholder="Search users..."
    className="input input-bordered input-sm flex-1 min-w-60 rounded-lg"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
