import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Protected } from "./middleware/Protected";

// Axios baseUrl
// axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
axios.defaults.baseURL = import.meta.env.VITE_LOCAL_SERVER;

// Routes
import Login from "./routes/Authentication/Login";
import Register from "./routes/Authentication/Register";
import Recover from "./routes/Authentication/Recover";
import Verify from "./routes/Authentication/Verify";
import ResetPassword from "./routes/Authentication/ResetPassword";
import NotFound from "./routes/NotFound";

import { store } from "./app/store";
import BookmarkView from "./routes/Bookmark/components/BookmarkView";
import Bookmarks from "./routes/Bookmark/Bookmarks";
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
    path: "/bookmarks",
    element: (
      <Protected>
        <RootLayout />
      </Protected>
    ),
    children: [
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: ":id",
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
