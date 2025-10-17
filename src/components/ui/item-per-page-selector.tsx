import { usePreferences } from "../../context/UserPreferencesContext";

const ItemsPerPageSelector: React.FC = () => {
  const { itemsPerPage, setItemsPerPage } = usePreferences();

  return (
    <select
      className="select select-sm bg-base-200 border-0 rounded-lg"
      value={itemsPerPage}
      onChange={(e) => setItemsPerPage(Number(e.target.value))}
    >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={25}>25 per page</option>
      <option value={50}>50 per page</option>
    </select>
  );
};

export default ItemsPerPageSelector;
