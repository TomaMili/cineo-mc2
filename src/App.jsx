import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import WatchTogether from "./pages/WatchTogether";
import WatchTogetherGroup from "./pages/WatchTogetherGroup";

import RegisterLayout from "./ui/RegisterLayout";
import RegisterInfo from "./pages/register_layout/RegisterInfo";
import RegisterGenres from "./pages/register_layout/RegisterGenres";
import RegisterPlatforms from "./pages/register_layout/RegisterPlatforms";
import RegisterActors from "./pages/register_layout/RegisterActors";
import RegisterPaymentPlan from "./pages/register_layout/RegisterPaymentPlan";
import RegisterFinish from "./pages/register_layout/RegisterFinish";

import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/app_layout/HomePage";
import Profile from "./pages/app_layout/Profile";
import Achievements from "./pages/app_layout/Achievements";
import Browse from "./pages/app_layout/Browse";
import Collections from "./pages/app_layout/Collections";
import MovieDetail from "./pages/app_layout/MovieDetail";

import Settings from "./pages/app_layout/Settings";
import SettingsInfo from "./features/settings/SettingsInfo";
import SettingsPlatforms from "./features/settings/SettingsPlatforms";
import SettingsPlan from "./features/settings/SettingsPlan";

import Watched from "./pages/app_layout/Watched";
import WatchLater from "./pages/app_layout/WatchLater";

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
              <Route index element={<Navigate replace to="landing-page" />} />
              <Route path="landing-page" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route element={<RegisterLayout />}>
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
              <Route path="movie/:movieId" element={<MovieDetail />} />
              <Route path="settings" element={<Settings />}>
                <Route index element={<Navigate replace to="info" />} />
                <Route path="info" element={<SettingsInfo />} />
                <Route path="platforms" element={<SettingsPlatforms />} />
                <Route path="plan" element={<SettingsPlan />} />
              </Route>
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
