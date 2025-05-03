// contexts/moviereviewsContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getReviews } from "../api/backend-api"; 
import { MovieReview } from "../types/interfaces";

// Define the context type for MovieReviews
interface MovieReviewsContextType {
  reviews: MovieReview[];
  isLoading: boolean;
  error: string | null;
}

// Define the provider props to accept children as ReactNode
interface MovieReviewsProviderProps {
  children: ReactNode;
}

export const MovieReviewsContext = createContext<MovieReviewsContextType | undefined>(undefined);

// Update the MovieReviewsProvider component to accept children
export const MovieReviewsProvider: React.FC<MovieReviewsProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
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

  return (
    <MovieReviewsContext.Provider value={{ reviews, isLoading, error }}>
      {children}
    </MovieReviewsContext.Provider>
  );
};

// Custom hook to use MovieReviewsContext
export const useMovieReviews = (): MovieReviewsContextType => {
  const context = useContext(MovieReviewsContext);
  if (!context) {
    throw new Error("useMovieReviews must be used within a MovieReviewsProvider");
  }
  return context;
};
