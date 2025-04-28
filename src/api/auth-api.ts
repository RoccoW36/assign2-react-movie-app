//Serverless API CDK Deploy Outputs:
//AuthAppStack.AppApiMovieReviewsAPIEndpoint12483A80 = https://n3zp3d45uc.execute-api.eu-west-1.amazonaws.com/dev/
//AuthAppStack.AuthServiceApiEndpointBBC1D636 = https://123sk92tsf.execute-api.eu-west-1.amazonaws.com/dev/

import { SignupDetails, ConfirmSignupDetails, SigninDetails } from "../types/interfaces";

const AUTH_BASE_URL = "https://123sk92tsf.execute-api.eu-west-1.amazonaws.com/dev/auth";

const fetchAuth = (url: string, method: string = 'GET', body?: object) => {
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
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
      console.error("Auth API fetch error:", error);
      throw error;
    });
};

export const signup = (userDetails: SignupDetails) =>
  fetchAuth(`${AUTH_BASE_URL}/signup`, 'POST', userDetails);

export const confirmSignup = (confirmDetails: ConfirmSignupDetails) =>
  fetchAuth(`${AUTH_BASE_URL}/confirm_signup`, 'POST', confirmDetails);

export const login = (loginDetails: SigninDetails) =>
  fetchAuth(`${AUTH_BASE_URL}/signin`, 'POST', loginDetails);

export const logout = () =>
  fetchAuth(`${AUTH_BASE_URL}/signout`);
