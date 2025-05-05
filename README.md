# Cineo
![CINEO](https://github.com/user-attachments/assets/35a0be55-76c6-4935-b9ad-f742c3b147e0)

---
---
![GREEN_MILE](https://github.com/user-attachments/assets/072e97ab-d560-45f6-aa0f-984991ab5d1c)

---
---
Cineo is a **React** web application for tracking, rating, and organising movies. Under the hood it relies on **Supabase** (database + authentication), while movie data comes from the **TMDB API**. Development is powered by **Vite**, styling is done with **Tailwind CSS**, and component animations use **Framer Motion**.


---

## 1 · Project structure

| Level    | Key files / directories                                                                                                 | Purpose / What they do                                                                                                                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Root** | `.env`, `package.json`, `tailwind.config.js`, `vite.config.js`, `README.md`, `.gitignore`,<br>`public/` (static assets) | Configuration & sensitive variables (e.g. `VITE_TMDB_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,`VITE_YOUTUBE_KEY`)                                                                                                         |
| **src/** | `main.jsx`, `App.jsx`                                                                                                   | React entry points                                                                                                                                                                                                    |
|          | `assets/`                                                                                                               | Images, SVGs, icons                                                                                                                                                                                                   |
|          | `context/`                                                                                                              | *React Contexts* (e.g. `MoviePopupContext`, `SuperSuggestContext`)                                                                                                                                                    |
|          | `features/`                                                                                                             | Sub-folder per major feature (registration, collections, watch-together …) – each contains its own components, hooks, helpers                                                                                         |
|          | `hooks/`                                                                                                                | Custom hooks: `useAuth`, `useReview`, `useProviders`, `usePopularMovies`, …                                                                                                                                           |
|          | `pages/`                                                                                                                | Route components (`HomePage`, `Login`, `MovieDetail`, `Browse`, `Settings`, …)                                                                                                                                        |
|          | `routes/`                                                                                                               | Wrappers for protected & public routes (`ProtectedRoute`, `PublicRoute`)                                                                                                                                              |
|          | `services/`                                                                                                             | API integrations:<br>• `apiTmdb.js` – TMDB queries<br>• `apiAuth.js` – signup / login / logout / profile update<br>• `apiUsers.js`, `apiCollections.js`, `apiWatched.js`, `apiWatchLater.js`, `apiAchievements.js`, … |
|          | `styles/`                                                                                                               | `index.css` (imports Tailwind + custom classes)                                                                                                                                                                       |

---

## 2 · Running the project

```bash
# 1. install dependencies
npm install          # or: yarn

# 2. start dev server
npm run dev          # http://localhost:3000

# 3. production build
npm run build
npm run preview      # static preview of the build
```

---

## 3 · Core technologies & packages

| Package                         | Why we use it                                             |
| ------------------------------- | --------------------------------------------------------- |
| **React 18**                    | Component-based UI                                        |
| **Vite**                        | Blazingly fast dev server + build                         |
| **Tailwind CSS**                | Utility-first, responsive styling                         |
| **Framer Motion**               | Micro-animations (pop-ups, movie cards, transitions)      |
| **@tanstack/react-query**       | Fetching, caching & syncing data (movies, user, genres …) |
| **React Router v6**             | SPA navigation + protected routes                         |
| **Supabase JS SDK**             | Auth, database and storage                                |
| **TMDB API**                    | Movie metadata, posters, genres                           |
| **Iconify**                     | 100 k+ SVG icons in one package                           |
| **react-hot-toast**             | Lightweight toast notifications                           |
| **react-intersection-observer** | Lazy loading / infinite scroll in movie lists             |

---

## 4 · Database & API (Supabase)
![shema-baze](https://github.com/user-attachments/assets/6848282c-1d33-4afc-9e66-6a05d81b151f)

### Key tables

| Table                   | What it stores                                                                   |
| ----------------------- | -------------------------------------------------------------------------------- |
| **users**               | Profiles (username, avatar, favourite genres, platforms, actors, plan …)         |
| **movies**              | Movie details (TMDB `api_id`, title, overview, genres, cast, runtime, ratings …) |
| **watched**             | Movies a user has watched + their personal rating                                |
| **watch\_later**        | Movies marked “watch later”                                                      |
| **collections**         | Custom movie lists (e.g. “Favourite Sci-Fi”, “Halloween 2024”)                   |
| **movies\_collections** | M\:N relation between movies and collections                                     |
| **achievements**        | Gamification milestones (“First Movie”, “Cinephile” …)                           |

### REST endpoints (auto-generated by Supabase)

`/rest/v1/users`, `/movies`, `/watched`, `/watch_later`, `/collections`, `/achievements`

> **Example `.env`**
>
> ```env
> VITE_TMDB_API_KEY=xxxxxxxx
> VITE_SUPABASE_URL=https://xyz.supabase.co
> VITE_SUPABASE_ANON_KEY=public-anon-key
> VITE_YOUTUBE_KEY=xxxxxxxxx
> ```

---

## 5 · App features

| Module                  | Quick description                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Registration & Auth** | Multi-step (info → genres → platforms → actors → plan → finish). Supabase Auth + custom `useAuth` hook.    |
| **Profile**             | Page with a hero block, stats overview, donut chart for achievements, latest activity feed, users movie DNA.|
| **Achievements**        | Progress tracker: users unlock badges such as “First Movie,” “Casual Viewer,” “Cinephile,” etc.                 |
| **Movie Page**          | Detailed view for each film: cinematic hero banner, synopsis, cast grid, stills & trailers, where-to-watch providers, community ratings, and a carousel of similar titles.|
| **Settings**            | Central hub for personalisation & account management – change profile info, password,...                    |
| **Supersuggestion**     | AI-driven recommendation panel that instantly proposes films based on your watch history, liked genres, current trends, and TMDB metadata; updates in real time as your tastes evolve.|
| **Watched / Later**     | Mark movies as “watched” or “watch later” (API + React Query).                                             |
| **Collections**         | Full CRUD on collections, modal for new collection, drag-and-drop inside the list.                         |
| **Browse & Search**     | Infinite scrolling of trending movies, genre filtering, movie detail page (cast, reviews, similar titles). |
| **Watch Together**      | Create / join real-time rooms for group watching (socket-based).                                           |
| **Extra UI**            | Share links, rating overlay, toasts, animated pop-ups.                                                     |

---

## 6 · Quick start guide

1. **Clone the repo**

   ```bash
   git clone <URL>
   cd cineo
   ```

2. **Install dependencies**
   `npm install`

3. **Create `.env`** (TMDB & Supabase keys).

4. **Run the dev server**
   `npm run dev` → open [http://localhost:3000](http://localhost:3000)

5. **Sign up** (route `/register/info`) and try it out:

   * recommendations on **/homepage**
   * manage collections on **/collections**
   * your profile on **/profile**
   * group watching on **/watch-together**

---

## 7 · Notes for developers

* **React Query Devtools** are enabled in development – super handy for debugging queries.
* Code follows the **ESLint + Prettier** style (standard Airbnb config).
* Tailwind config includes a custom colour palette and *container queries* for extra-responsive design.

---

