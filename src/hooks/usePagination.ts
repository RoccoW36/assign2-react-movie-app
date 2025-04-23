import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PaginationProps {
  initialTotalPages?: number;
}

export const usePagination = ({ initialTotalPages }: PaginationProps = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const rawPage = queryParams.get("page");
  const pageFromURL = rawPage && !isNaN(Number(rawPage)) && Number(rawPage) > 0 
    ? Number(rawPage) 
    : 1;
  console.log("Extracted and validated page from URL:", pageFromURL);

  const [page, setPage] = useState<number>(pageFromURL);
  const [totalPages, setTotalPages] = useState(initialTotalPages ?? 1);

  useEffect(() => {
    console.log("Checking URL sync - Page:", page, "Page from URL:", pageFromURL);
    if (queryParams.has("page") && page !== pageFromURL) {
      console.log("Syncing page state with URL:", pageFromURL);
      setPage(pageFromURL);
    }
  }, [location.search]);

  useEffect(() => {
    if (page !== pageFromURL) {
      console.log("Updating URL with page:", page);
      queryParams.set("page", String(page));
      navigate({ search: queryParams.toString() }, { replace: true });
    }
  }, [page, navigate]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    console.log(`User clicked to change page to: ${value}`);
    if (!isNaN(value) && value > 0) {
      queryParams.set("page", String(value));
      navigate({ search: queryParams.toString() }, { replace: true });
      setPage(value);
    } else {
      console.warn("Attempted to set invalid page:", value);
    }
  };

  const updateTotalPages = (total: number) => {
    console.log(`Updating total pages to: ${total}`);
    setTotalPages(total);
  };

  return { page, handlePageChange, totalPages, updateTotalPages };
};
