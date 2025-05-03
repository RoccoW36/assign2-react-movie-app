import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getReviews } from "../api/backend-api";
import { MovieReview } from "../types/interfaces";

interface MovieReviewsContextType {
  reviews: MovieReview[];
  isLoading: boolean;
  error: string | null;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}
interface FilterState {
  movieId: string;
  reviewerId: string;
  content: string;
  reviewDate: string;
  sortOption: string;
}

interface MovieReviewsProviderProps {
  children: ReactNode;
}

export const MovieReviewsContext = createContext<MovieReviewsContextType | undefined>(undefined);

export const MovieReviewsProvider: React.FC<MovieReviewsProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<MovieReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    movieId: "",
    reviewerId: "",
    content: "",
    reviewDate: "",
    sortOption: "",
  });

  const applyFiltersAndSort = (reviews: MovieReview[]) => {
    return reviews
      .filter((review) => {
        return (
          review.movieId.toString().includes(filters.movieId) &&
          review.reviewerId.includes(filters.reviewerId) &&
          review.content.toLowerCase().includes(filters.content.toLowerCase()) &&
          (filters.reviewDate ? review.reviewDate.includes(filters.reviewDate) : true)
        );
      })
      .sort((a, b) => {
        if (filters.sortOption === "dateAsc") {
          return new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime();
        }
        if (filters.sortOption === "dateDesc") {
          return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
        }
        if (filters.sortOption === "movieId") {
          return Number(a.movieId) - Number(b.movieId); 
        }
        if (filters.sortOption === "reviewerId") {
          return a.reviewerId.localeCompare(b.reviewerId); 
        }
        return 0;
      });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await getReviews();
        const data = await response.json();
        if (data.data) {
          setReviews(data.data);
        } else {
          setError("No reviews found");
        }
      } catch (err) {
        setError("Failed to fetch reviews");
        console.error("Error fetching reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const updatedReviews = applyFiltersAndSort(reviews);
      setFilteredReviews(updatedReviews);
    }
  }, [reviews, filters]);

  return (
    <MovieReviewsContext.Provider value={{ reviews: filteredReviews, isLoading, error, filters, setFilters }}>
      {children}
    </MovieReviewsContext.Provider>
  );
};

export const useMovieReviews = (): MovieReviewsContextType => {
  const context = useContext(MovieReviewsContext);
  if (!context) {
    throw new Error("useMovieReviews must be used within a MovieReviewsProvider");
  }
  return context;
};
