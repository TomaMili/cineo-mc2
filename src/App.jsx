import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="homepage" />} />
            <Route path="homepage" element={<HomePage />} />
            <Route path="profile/:userId" element={<HomePage />} />
            <Route path="profile/achievements" element={<HomePage />} />
            <Route path="watchlist" element={<HomePage />} />
            <Route path="watchlist/watchlater" element={<HomePage />} />
            <Route path="watchlist/watched" element={<HomePage />} />
            <Route path="watchlist/collections" element={<HomePage />} />
            <Route path="watch-together" element={<HomePage />} />
            <Route path="movie/:id" element={<HomePage />} />
            <Route path="settings" element={<HomePage />} />
            <Route path="settings/info-settings" element={<HomePage />} />
            <Route path="settings/platforms-settings" element={<HomePage />} />
            <Route path="settings/plan-settings" element={<HomePage />} />
            <Route path="suggested" element={<HomePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="landing-page" element={<PageNotFound />} />
          <Route path="register" element={<PageNotFound />} />
          <Route path="login" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
