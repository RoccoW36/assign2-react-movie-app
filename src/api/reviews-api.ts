//Serverless API CDK Deploy Outputs:
//AuthAppStack.AppApiMovieReviewsAPIEndpoint12483A80 = https://n3zp3d45uc.execute-api.eu-west-1.amazonaws.com/dev/
//AuthAppStack.AuthServiceApiEndpointBBC1D636 = https://123sk92tsf.execute-api.eu-west-1.amazonaws.com/dev/

import { Review } from "../types/interfaces";

const REVIEW_BASE_URL = "https://n3zp3d45uc.execute-api.eu-west-1.amazonaws.com/dev/movies";

const fetchReview = (url: string, method: string = "GET", body?: object) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  return fetch(url, options)
    .then(async (response) => {
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(`Failed to fetch from ${url}. Status: ${response.status}. ${JSON.stringify(errorBody)}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Review API fetch error:", error);
      throw error;
    });
};

export const sendReview = (reviewData: Review) =>
  fetchReview(`${REVIEW_BASE_URL}/reviews`, "POST", reviewData);
