const Pagination: React.FC<{
  page: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
}> = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-between items-center p-4 border-t border-base-300 flex-wrap gap-4">
      <div className="text-sm opacity-60">
        Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of{" "}
        {total}
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-sm rounded-lg"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        {[...Array(Math.min(5, totalPages))].map((_, i) => (
          <button
            key={i + 1}
            className={`btn btn-sm rounded-lg ${
              page === i + 1 ? "btn-primary" : ""
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {totalPages > 5 && <span className="flex items-center">...</span>}
        <button
          className="btn btn-sm rounded-lg"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
