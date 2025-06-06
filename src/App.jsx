import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "./ui/Spinner";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { MoviePopupProvider } from "./context/MoviePopupContext";
import { SuperSuggestProvider } from "./context/SuperSuggestContext";
import { RegistrationProvider } from "./features/register/RegistrationContext";
import { Toaster } from "react-hot-toast";

// lazy-load pages
const AppLayout = lazy(() => import("./ui/AppLayout"));
const HomePage = lazy(() => import("./pages/app_layout/HomePage"));
const Profile = lazy(() => import("./pages/app_layout/Profile"));
const Achievements = lazy(() => import("./pages/app_layout/Achievements"));
const Browse = lazy(() => import("./pages/app_layout/Browse"));
const Collections = lazy(() => import("./pages/app_layout/Collections"));
const MovieDetail = lazy(() => import("./pages/app_layout/MovieDetail"));
const Settings = lazy(() => import("./pages/app_layout/Settings"));
const SettingsInfo = lazy(() => import("./features/settings/SettingsInfo"));
const SettingsPlatforms = lazy(() =>
  import("./features/settings/SettingsPlatforms")
);
const SettingsPlan = lazy(() => import("./features/settings/SettingsPlan"));
const Watched = lazy(() => import("./pages/app_layout/Watched"));
const WatchLater = lazy(() => import("./pages/app_layout/WatchLater"));
const WatchTogether = lazy(() => import("./pages/WatchTogether"));
const WatchTogetherGroup = lazy(() =>
  import("./features/watch_together/WatchTogetherGroup")
);

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const RegisterLayout = lazy(() => import("./features/register/RegisterLayout"));
const RegisterInfo = lazy(() => import("./features/register/RegisterInfo"));
const RegisterGenres = lazy(() => import("./features/register/RegisterGenres"));
const RegisterPlatforms = lazy(() =>
  import("./features/register/RegisterPlatforms")
);
const RegisterActors = lazy(() => import("./features/register/RegisterActors"));
const RegisterPaymentPlan = lazy(() =>
  import("./features/register/RegisterPaymentPlan")
);
const RegisterFinish = lazy(() => import("./features/register/RegisterFinish"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <MoviePopupProvider>
        <SuperSuggestProvider>
          <Suspense
            fallback={<Spinner size={48} className="fixed inset-0 m-auto" />}
          >
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
          </Suspense>
        </SuperSuggestProvider>
      </MoviePopupProvider>

      <Toaster
        position="bottom-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          style: {
            background: "#121212",
            color: "white",
            border: "none",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </BrowserRouter>
  );
}
