import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Protected } from "./middleware/Protected";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { lazy, Suspense } from "react";

// Axios baseUrl
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
// axios.defaults.baseURL = import.meta.env.VITE_LOCAL_SERVER;

// Routes
const Login = lazy(() => import("./routes/Authentication/Login"));
const Register = lazy(() => import("./routes/Authentication/Register"));
const Recover = lazy(() => import("./routes/Authentication/Recover"));
const Verify = lazy(() => import("./routes/Authentication/Verify"));
const ResetPassword = lazy(
  () => import("./routes/Authentication/ResetPassword")
);
const NotFound = lazy(() => import("./routes/NotFound"));

import { store } from "./app/store";
import LoaderFallback from "./components/LoaderFallback";
const BookmarkView = lazy(
  () => import("./routes/Bookmark/components/BookmarkView")
);
const Bookmarks = lazy(() => import("./routes/Bookmark/Bookmarks"));
const LandingPage = lazy(() => import("./routes/LandingPage"));

const RootLayout = lazy(() => import("./routes/RootLayout"));

if (import.meta.env.VITE_NODE_ENV === "production") {
  disableReactDevTools();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <LandingPage />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoaderFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/recover",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <Recover />
      </Suspense>
    ),
  },
  {
    path: "/verify",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <Verify />
      </Suspense>
    ),
  },
  {
    path: "/reset",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <Suspense fallback={<LoaderFallback />}>
          <RootLayout />
        </Suspense>
      </Protected>
    ),
    children: [
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/bookmark/:id",
        element: <BookmarkView />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </Provider>
  );
};

export default App;
