// src/features/pagination/Pagination.tsx
import React from 'react';
import { PaginationProps } from './paginationTypes';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {
        pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))
      }

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;