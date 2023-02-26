import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Protected } from "./middleware/Protected";

// Axios baseUrl
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

// Routes
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Recover from "./pages/Recover";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

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
]);

const App = () => {
  return (
    <AuthProvider>
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </AuthProvider>
  );
};

export default App;
