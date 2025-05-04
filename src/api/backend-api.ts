import { APIConfig } from "../config";
import {
  SignupDetails,
  ConfirmSignupDetails,
  SigninDetails,
  Review
} from "../types/interfaces";

export const sendReview = (review: Review, authToken: string) => {
  const movieId = review.movieId;
  const baseUrl = APIConfig.API.endpoints[0].endpoint.replace(/\/+$/, "");
  const url = `${baseUrl}/movies/${movieId}/reviews`;
  console.log("Sending review to URL:", url);

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: `token=${authToken}; Path=/; HttpOnly; Secure`,
    },
    body: JSON.stringify(review),
  });
};



export const getReviews = async () => {
  const baseUrl = APIConfig.API.endpoints[0].endpoint.replace(/\/+$/, "");
  const url = `${baseUrl}/movies/all-reviews`;

  console.log("Fetching reviews from URL:", url);

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
};


export const authenticateUser = (details: SigninDetails) => {
  return fetch(`${APIConfig.API.endpoints[1].endpoint}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.token) {
        localStorage.setItem("token", json.token);
      }
      return json;
    });
};

export const signupUser = (details: SignupDetails) => {
  return fetch(`${APIConfig.API.endpoints[1].endpoint}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

export const confirmSignup = (details: ConfirmSignupDetails) => {
  return fetch(`${APIConfig.API.endpoints[1].endpoint}/confirm_signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};



