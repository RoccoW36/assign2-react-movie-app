import React from "react";
import { Pagination } from "@mui/material";

interface PaginationUIProps {
  page: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages: number;
}

const PaginationUI: React.FC<PaginationUIProps> = ({ page, handlePageChange, totalPages }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
      <Pagination
        count={totalPages > 0 ? totalPages : 1}
        page={page}
        onChange={handlePageChange}
        color="primary"
        siblingCount={1}
        boundaryCount={1}
        aria-label="Movie pagination"
      />
    </div>
  );
};

export default PaginationUI;
