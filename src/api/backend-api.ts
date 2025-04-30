import { SignupDetails, ConfirmSignupDetails, SigninDetails, Review } from "../types/interfaces";

// Fetch the config.json to get the API URLs
const fetchConfig = async () => {
  const config = await fetch("./config.json").then((response) => response.json());
  return config;
};

// Utility function to dynamically fetch from API
const fetchApi = async (url: string, method: string = 'GET', body?: object) => {
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
      console.error("API fetch error:", error);
      throw error;
    });
};

// Helper to construct the API URL dynamically based on the fetched config
const getApiUrl = async (endpoint: string, apiType: "authApi" | "appApi") => {
  const config = await fetchConfig(); 
  const baseUrl = apiType === "authApi" ? config.authUrl : config.apiUrl;
  return `${baseUrl}${endpoint}`;
};

// ===============================
// Authentication API Methods
// ===============================

// API call for signup
export const signup = async (userDetails: SignupDetails) => {
  const signupUrl = await getApiUrl('/signup', 'authApi');
  return fetchApi(signupUrl, 'POST', userDetails);
};

// API call for confirming signup
export const confirmSignup = async (confirmDetails: ConfirmSignupDetails) => {
  const confirmUrl = await getApiUrl('/confirm_signup', 'authApi');
  return fetchApi(confirmUrl, 'POST', confirmDetails);
};

// API call for login (signin)
export const login = async (loginDetails: SigninDetails) => {
  const signinUrl = await getApiUrl('/signin', 'authApi');
  return fetchApi(signinUrl, 'POST', loginDetails);
};

// API call for logout (signout)
export const logout = async () => {
  const signoutUrl = await getApiUrl('/signout', 'authApi');
  return fetchApi(signoutUrl);
};

// API call for adding a new movie review
export const addMovieReview = async (movieId: string, reviewData: Review) => {
  const addReviewUrl = await getApiUrl(`/movies/${movieId}/reviews`, 'appApi');
  return fetchApi(addReviewUrl, 'POST', reviewData);
};

