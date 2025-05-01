import { APIConfig } from "../config";
import {
  SignupDetails,
  ConfirmSignupDetails,
  SigninDetails,
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
