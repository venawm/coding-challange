import { usePreferences } from "../../context/UserPreferencesContext";

const Pagination: React.FC<{ total: number }> = ({ total }) => {
  const { page, itemsPerPage, setPage } = usePreferences();
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="flex justify-between items-center p-4 border-t border-base-300 flex-wrap gap-4">
      <div className="text-sm opacity-60">
        Showing {(page - 1) * itemsPerPage + 1}-
        {Math.min(page * itemsPerPage, total)} of {total}
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-sm rounded-lg"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        {[...Array(Math.min(5, totalPages))].map((_, i) => (
          <button
            key={i + 1}
            className={`btn btn-sm rounded-lg ${
              page === i + 1 ? "btn-primary" : ""
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {totalPages > 5 && <span className="flex items-center">...</span>}
        <button
          className="btn btn-sm rounded-lg"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
