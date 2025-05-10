# 🎬 Movies App – A Full-Stack React SPA

**Author:** Martin Walsh  
**Demo:** [YouTube Walkthrough](https://youtu.be/gSbar2H3hOk)  
**GitHub Repo (React)**: [GitHub Repo](https://github.com/RoccoW36/assign2-react-movie-app.git)  
**GitHub Repo (CDK)**: [CDK Repo](https://github.com/RoccoW36/assign2-cdk-serverless-api.git)  

---

## 🚀 Overview

This **single-page application (SPA)** was developed using **React + TypeScript** and integrates the **TMDB** API for exploring movies, TV shows, and actors. It includes user authentication via **AWS Cognito** and features a custom backend built with **AWS Lambda** and **DynamoDB**. The app supports **pagination**, **filtering**, **sorting**, and **title-based search** functionalities for browsing movies, TV series, and actors.

### Key Features:
- 🔍 **Browse movies, TV shows, and actors** from TMDB.
- ✍️ **Add and read movie reviews** – submit reviews on favourite movies; read my movie reviews stored in the backend.
- 🧠 **Fantasy movie builder** – create and manage fantasy movie entries (Note: fantasy movies are stored **locally**, not in the backend).
- 🧾 **Manage personal lists** – mark favourites and build must-watch playlists for upcoming movies and airing TV shows.
- 🔒 **Private routes** – certain pages only accessible to logged-in users: my movie reviews, fantasy movie details, create fantasy movie form, submit movie review form.
- 🗂️ **Filtering and sorting** – by title/name, genre, rating, newest, popularity, and more.
- 📄 **Pagination UI** – on movie, TV show, and actor listing pages.
- 🔁 **Smooth client-side routing** for seamless transitions between pages.
- 🧑‍🤝‍🧑 **Favourites** – allow users to mark their favourite movies, TV shows, and actors.
- **Fantasy Movie Creation**: Users can create fantasy movie records with details such as Title, Overview, Genres, Release Date, Runtime, and Production Companies. These movies are stored **locally** on the frontend.
- **Must-Watch Playlist**: Users can mark upcoming movies and TV shows airing today as "must-watch", creating a personalized watchlist separate from general favourites.
- **Movie Reviews**: Users can submit and view movie reviews stored securely in **DynamoDB**.
- **Global Search**: A search feature allows users to search for movies, TV shows, and actors using TMDB's search endpoint.
- **Advanced Pagination & Sorting**: Pagination is integrated with **MUI Pagination** and state caching using **React Query**, with advanced sorting and filtering options across genres, popularity, ratings, and more.

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
- **Storybook** – for building and testing UI components in isolation to align with the app build

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
- ✍️ **Add and read movie reviews** – submit reviews on favourite movies; read my movie reviews stored in the backend.
- 🧠 **Fantasy movie builder** – create and manage fantasy movie entries (Note: fantasy movies are stored **locally**, not in the backend)
- 🧾 **Manage personal lists** – mark favourites and build must-watch playlists for upcoming movies and airing TV shows
- 🔒 **Private routes** – certain pages only accessible to logged-in users: my movie reviews, fantasy movie details, create fantasy movie form, submit movie review form
- 🗂️ **Filtering and sorting** – by genre, popularity, release date, vote average, and more
- 📄 **Pagination UI** – on movie, TV show, and actor listing pages
- 🔁 **Smooth client-side routing** for seamless transitions between pages
- 🧑‍🤝‍🧑 **Favourites** – allow users to mark their favourite movies, TV shows, and actors

---

## 🔢 Pagination, Filtering & Sorting

Pagination is implemented on all content listing pages (movies, TV series, actors) using **React Query** for caching and **MUI Pagination** for the UI.

Key features include:
- **Pagination**: For movie and TV show lists with dynamic page control
- **Advanced Filtering**: Includes filtering by title, genre, gender, rating, and other criteria
- **Sorting**: Sort movie lists and TV show lists by ratings; Sort movie review lists by review date, movie ID, reviewerID
- **Search feature**: A title-based search field in the header filters Movies, TV Shows, and Actors into tabbed result views

---
