import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Protected } from "./middleware/Protected";

// Axios baseUrl
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

// Routes
import Login from "./pages/Authentication/Login";
import Profile from "./pages/Home/Profile";
import Register from "./pages/Authentication/Register";
import Recover from "./pages/Authentication/Recover";
import Verify from "./pages/Authentication/Verify";
import ResetPassword from "./pages/Authentication/ResetPassword";
import NotFound from "./pages/NotFound";

import { store } from "./app/store";
import BookmarkView from "./pages/Home/components/BookmarkView";
import Bookmarks from "./pages/Home/components/Bookmarks";
import RootLayout from "./routes/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recover",
    element: <Recover />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/me",
    element: (
      <Protected>
        <RootLayout />
      </Protected>
    ),
    children: [
      {
        path: "bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "bookmarks/:id",
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
