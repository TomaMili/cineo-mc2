import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  // const { user } = useAuth();
  const user = true;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route element={<RegisterLayout />}>
                <Route
                  index
                  element={<Navigate replace to="register/info" />}
                />
                <Route path="register/info" element={<RegisterInfo />} />
                <Route path="register/genres" element={<RegisterGenres />} />
                <Route
                  path="register/platforms"
                  element={<RegisterPlatforms />}
                />
                <Route path="register/actors" element={<RegisterActors />} />
                <Route
                  path="register/payment-plan"
                  element={<RegisterPaymentPlan />}
                />
                <Route path="register/finish" element={<RegisterFinish />} />
              </Route>
            </>
          ) : (
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="homepage" />} />
              <Route path="homepage" element={<HomePage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/achievements" element={<Achievements />} />
              <Route path="watchlater" element={<WatchLater />} />
              <Route path="watched" element={<Watched />} />
              <Route path="collections" element={<Collections />} />
              <Route path="watch-together" element={<WatchTogether />} />
              <Route
                path="watch-together/:groupId"
                element={<WatchTogetherGroup />}
              />
              <Route path="movie/:id" element={<MovieDetail />} />
              <Route path="settings/info" element={<SettingsInfo />} />
              <Route
                path="settings/platforms"
                element={<SettingsPlatforms />}
              />
              <Route path="settings/plan" element={<SettingsPlan />} />
              <Route path="browse" element={<Browse />} />
            </Route>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
