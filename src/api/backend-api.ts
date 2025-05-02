import { APIConfig } from "../config";
import {
  SignupDetails,
  ConfirmSignupDetails,
  SigninDetails,
  Review
} from "../types/interfaces";

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

export const sendReview = (review: Review, token: string) => {
  const movieId = review.movieId; 

  return fetch(`${APIConfig.API.endpoints[0].endpoint}/movies/${movieId}/reviews`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to submit review");
      }
      return res.json();
    });
};

