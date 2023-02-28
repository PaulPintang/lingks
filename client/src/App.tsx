import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Protected } from "./middleware/Protected";

// Axios baseUrl
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

// Routes
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Recover from "./pages/Recover";
import Verify from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

import Todo from "./test/Todo";

import { AuthProvider } from "./context/AuthContext";
import { store } from "./app/store";

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
        <Profile />
      </Protected>
    ),
  },
  {
    path: "/todo",
    element: <Todo />,
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
