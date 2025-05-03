import { APIConfig } from "../config";
import {
  SignupDetails,
  ConfirmSignupDetails,
  SigninDetails,
  Review
} from "../types/interfaces";

export const sendReview = (review: Review) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please sign in first.");
  }
  const movieId = review.movieId;
  const baseUrl = APIConfig.API.endpoints[0].endpoint.replace(/\/+$/, "");
  const url = `${baseUrl}/movies/${movieId}/reviews`;
  console.log("Sending review to URL:", url);
  console.log("Authorization Token:", token);

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
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



