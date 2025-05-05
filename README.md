# 🎬 Movies App – A Full-Stack React SPA

**Author:** Martin Walsh  
**Demo:** [YouTube Walkthrough](to be added when recorded)  
**GitHub Repo (React)**: [GitHub Repo](https://github.com/RoccoW36/assign2-react-movie-app.git)  
**GitHub Repo (CDK)**: [CDK Repo](https://github.com/RoccoW36/assign2-cdk-serverless-api.git)  

---

## 🚀 Overview

This **single-page application (SPA)** was developed using **React + TypeScript** and integrates **TMDB** API for exploring movies, TV shows, and actors. It includes user authentication via **AWS Cognito** and features a custom backend built with **AWS Lambda** and **DynamoDB**. The app supports **pagination**, **filtering**, **sorting**, and **multi-criteria search** functionalities for movie, TV series, and actor browsing.

In this assignment, I extended the functionality from Assignment 1 by integrating the backend API and adding various new features, including a **fantasy movie** section, **movie reviews**, and **advanced sorting and filtering** options.

---

## 🧰 Tech Stack

### Frontend
- **Vite** + **React** + **TypeScript**
- **React Router**
- **React Query** – for state management and caching
- **MUI (Material UI)** – for pagination and UI components

### Backend / APIs
- **AWS Cognito** – user authentication
- **AWS Lambda** + **API Gateway** – custom REST API
- **DynamoDB** – stores reviews
- **TMDB** – external data source for movies, TV shows, and actors

### Additional Libraries and Tools
- **React Query DevTools** – for live query debugging
- **Context API** – for state management (auth state)
- **MUI Pagination** – for pagination UI

---

## 🗺️ Routing Overview

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Home page (movie list) |
| `/movies/:id` | Public | Movie details |
| `/movies/favourites` | Public | Favourite movies |
| `/movies/mustwatch` | Public | Must-watch list |
| `/movies/upcoming` | Public | Upcoming movies |
| `/movies/nowplaying` | Public | Now playing |
| `/movies/toprated` | Public | Top rated |
| `/movies/fantasy` | Public | Community fantasy movies |
| `/movies/fantasy/new` | Private | Add fantasy movie |
| `/movies/fantasy/:id` | Private | Fantasy movie detail |
| `/tv` | Public | Discover TV shows |
| `/tv/:id` | Public | TV show details |
| `/tv/airingtoday` | Public | Airing today |
| `/tv/toprated` | Public | Top rated shows |
| `/tv/favourites` | Public | Favourite TV shows |
| `/tv/mustwatch` | Public | Must-watch TV shows |
| `/actors` | Public | Popular actors |
| `/actors/:id` | Public | Actor details |
| `/actors/favourites` | Public | Favourite actors |
| `/reviews/:id` | Public | Read a movie review |
| `/reviews/form` | Private | Submit a new review |
| `/reviews` | Private | My submitted reviews |
| `/search` | Public | Search all TMDB content |
| `/login` / `/signup` | Public | Auth pages |

---

## 🔐 Authentication

- **AWS Cognito** handles user registration, login, and session management.
- JWT token stored in `localStorage` for authentication.
- Protected routes are gated by the `<PrivateRoute />` component to ensure users can only access authenticated pages.
- User data, including movie reviews, is stored securely in **DynamoDB**.

---

## 🌐 API Overview

### 🔸 Custom API (AWS Lambda)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | User signup |
| POST | `/confirm_signup` | Confirm account |
| POST | `/signin` | Sign in |
| GET  | `/movies/all-reviews` | Get all reviews |
| POST | `/movies/:movieId/reviews` | Submit a movie review |

### 🔹 TMDB API

| Resource | Endpoint |
|----------|----------|
| Movies | `/discover/movie`, `/movie/:id`, etc. |
| TV Shows | `/discover/tv`, `/tv/:id`, etc. |
| People | `/person/:id`, `/person/popular` |
| Search | `/search/movie`, `/search/person`, `/search/tv` |
| Genres | `/genre/movie/list` |
| Reviews | `/movie/:id/reviews`, `/tv/:id/reviews` |

> API keys stored securely via Vite `.env` files

---

## 🧩 Features

- 🔍 **Browse movies, TV shows, and actors** from TMDB
- ✍️ **Add and read movie reviews**.
- 🧠 **Fantasy movie builder** – create and manage fantasy movie entries (Note: fantasy movies are stored **locally**, not in the backend).
- 🧾 **Manage personal lists** – favourites, must-watch lists.
- 🔒 **Private routes** – certain pages only accessible to logged-in users.
- 🗂️ **Filtering and sorting** – by genre, popularity, release date, vote average, and more.
- 📄 **Pagination UI** – on movie, TV show, and actor listing pages.
- 🔁 **Smooth client-side routing** for seamless transitions between pages.
- 🧑‍🤝‍🧑 **Favourites** – allow users to mark their favourite movies, TV shows, and actors.

### New Features:
- **Fantasy Movie Creation**: Users can create fantasy movie records with limited details (Title, Overview, Genres, Release Date, Runtime, and Production Companies). These fantasy movies are stored **locally** in the frontend and are not submitted to the backend.
- **Multi-Criteria Search**: Implemented a search feature to search movies, TV shows, and actors based on multiple criteria (genre, popularity, release year, etc.).
- **Advanced Pagination**: Pagination integrated using MUI's `<Pagination />` component with client-side state caching via React Query for smoother and faster page transitions.
- **Movie Reviews**: Users can submit reviews for movies, which are stored in DynamoDB for later retrieval and display on the app.

---

## 🔢 Pagination, Filtering & Sorting

Pagination is implemented on all content listing pages (movies, TV series, actors) using **React Query** for caching and **MUI Pagination** for the UI.

Key features include:
- **Pagination**: For movie and TV show lists with dynamic page control.
- **Advanced Filtering**: Includes filtering by genre, rating, and other criteria.
- **Sorting**: Sort movie lists by popularity, rating, release date, etc.
- **Multi-Criteria Search**: A form-based search to filter content based on multiple parameters.

---