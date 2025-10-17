import { usePreferences } from "../../context/UserPreferencesContext";

interface PaginationProps {
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const { page, itemsPerPage, setPage } = usePreferences();
  const totalPages = Math.ceil(total / itemsPerPage);

  if (totalPages <= 1) return null;

  // Determine which page numbers to show (window of 5)
  const visiblePages = (() => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    // Adjust window if near start or end
    if (page <= 3) end = Math.min(5, totalPages);
    if (page >= totalPages - 2) start = Math.max(totalPages - 4, 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  })();

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

        {visiblePages[0] > 1 && (
          <>
            <button
              className="btn btn-sm rounded-lg"
              onClick={() => setPage(1)}
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="flex items-center">...</span>
            )}
          </>
        )}

        {visiblePages.map((p) => (
          <button
            key={p}
            className={`btn btn-sm rounded-lg ${
              page === p ? "btn-primary" : ""
            }`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="flex items-center">...</span>
            )}
            <button
              className="btn btn-sm rounded-lg"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

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
