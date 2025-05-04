import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import WatchTogether from "./pages/WatchTogether";
import WatchTogetherGroup from "../src/features/watch_together/WatchTogetherGroup";

import RegisterLayout from "./features/register/RegisterLayout";
import RegisterInfo from "./features/register/RegisterInfo";
import RegisterGenres from "./features/register/RegisterGenres";
import RegisterPlatforms from "./features/register/RegisterPlatforms";
import RegisterActors from "./features/register/RegisterActors";
import RegisterPaymentPlan from "./features/register/RegisterPaymentPlan";
import RegisterFinish from "./features/register/RegisterFinish";

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

import { MoviePopupProvider } from "./context/MoviePopupContext";
import { SuperSuggestProvider } from "./context/SuperSuggestContext";
import { RegistrationProvider } from "./features/register/RegistrationContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MoviePopupProvider>
          <SuperSuggestProvider>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="homepage" element={<HomePage />} />
                  <Route path="profile" element={<Profile />} />
                  <Route
                    path="profile/achievements"
                    element={<Achievements />}
                  />
                  <Route path="watchlater" element={<WatchLater />} />
                  <Route path="watched" element={<Watched />} />
                  <Route path="collections" element={<Collections />} />
                  <Route path="watch-together" element={<WatchTogether />} />
                  <Route
                    path="watch-together/:groupId"
                    element={<WatchTogetherGroup />}
                  />
                  <Route path="movie/:movieId" element={<MovieDetail />} />
                  <Route path="browse" element={<Browse />} />
                  <Route path="settings" element={<Settings />}>
                    <Route index element={<SettingsInfo />} />
                    <Route path="info" element={<SettingsInfo />} />
                    <Route path="platforms" element={<SettingsPlatforms />} />
                    <Route path="plan" element={<SettingsPlan />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="landing-page" element={<LandingPage />} />
                <Route path="login" element={<Login />} />
                <Route
                  element={
                    <RegistrationProvider>
                      <RegisterLayout />
                    </RegistrationProvider>
                  }
                >
                  <Route path="info" element={<RegisterInfo />} />
                  <Route path="genres" element={<RegisterGenres />} />
                  <Route path="platforms" element={<RegisterPlatforms />} />
                  <Route path="actors" element={<RegisterActors />} />
                  <Route
                    path="payment-plan"
                    element={<RegisterPaymentPlan />}
                  />
                  <Route path="finish" element={<RegisterFinish />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </SuperSuggestProvider>
        </MoviePopupProvider>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "17px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#121212",
            color: "var(--color-grey-700)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          },
        }}
      />
    </>
  );
}
