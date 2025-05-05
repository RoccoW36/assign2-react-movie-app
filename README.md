# 🎬 Movie Review App – A Full-Stack React SPA

**Author:** Martin Walsh  
**Demo:** [YouTube Walkthrough](to be added when recorded)

---

## 🚀 Overview

A full-featured single-page application (SPA) built with **React + TypeScript** that enables users to explore movies, TV shows, and actors via **TMDB**, write and manage reviews, and contribute to a **community fantasy movie** catalog. Authenticated features are powered by a **custom backend (AWS Cognito + Lambda + DynamoDB)**.

---

## 🧰 Tech Stack

### Frontend
- Vite + React + TypeScript
- Tailwind CSS
- React Router
- React Query

### Backend / APIs
- AWS Cognito – user authentication
- AWS Lambda + API Gateway – REST API
- DynamoDB – stores reviews and fantasy movies
- TMDB – external data source

### Tooling
- React Query DevTools
- ESLint
- Context API
- Private routes for protected access

---


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

- Uses **AWS Cognito** for registration, confirmation, login
- JWT token stored in localStorage
- Auth context handles login state
- Protected routes gated by `<PrivateRoute />` component

---

## 🌐 API Overview

### 🔸 Custom API (AWS Lambda)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | User signup |
| POST | `/confirm_signup` | Confirm account |
| POST | `/signin` | Sign in |
| GET  | `/movies/all-reviews` | Get all reviews |
| POST | `/movies/:movieId/reviews` | Submit a review |

### 🔹 TMDB API

| Resource | Endpoint |
|----------|----------|
| Movies | `/discover/movie`, `/movie/:id`, etc. |
| TV Shows | `/discover/tv`, `/tv/:id`, etc. |
| People | `/person/:id`, `/person/popular` |
| Search | `/search/movie`, `/search/person`, `/search/tv` |
| Genres | `/genre/movie/list` |
| Reviews | `/movie/:id/reviews`, `/tv/:id/reviews` |

> My TMDB API key is stored via Vite's env:
```env
