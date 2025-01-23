import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onFirst,
  onLast,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      {/* First Page */}
      <button
        onClick={onFirst}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-green-400/10"
      >
        <ChevronsLeft className="w-5 h-5" />
      </button>

      {/* Previous Page */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-green-400/10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Info */}
      <span className="text-sm text-gray-600 dark:text-green-300">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Page */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-green-400/10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Last Page */}
      <button
        onClick={onLast}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-green-400/10"
      >
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
