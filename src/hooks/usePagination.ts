import { useState } from "react";

interface PaginationProps {
  initialPage?: number;
  initialTotalPages?: number;
}

export const usePagination = ({ initialPage = 1, initialTotalPages = 1 }: PaginationProps) => {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const updateTotalPages = (total: number) => {
    setTotalPages(total);
  };

  return { page, handlePageChange, totalPages, updateTotalPages };
};

