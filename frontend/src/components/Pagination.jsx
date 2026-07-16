import React, { useMemo } from "react";
import Button from "./Button";

const Pagination = ({ page, totalPages, onPageChange, loading = false }) => {
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, index) => index), [totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
      <p className="text-sm font-medium text-slate-600">
        Page {page + 1} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="secondary"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0 || loading}
        >
          Previous
        </Button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            disabled={loading}
            className={`h-10 w-10 rounded-lg text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
              pageNumber === page
                ? "bg-blue-600 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}

        <Button
          variant="secondary"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1 || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
