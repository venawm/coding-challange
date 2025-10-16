import { Search } from "lucide-react";

const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => (
  <div className="relative flex-1 min-w-[200px]">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
    <input
      type="text"
      placeholder="Search users..."
      className="input input-sm w-full pl-10 bg-base-200 border-0 rounded-lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
