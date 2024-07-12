import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ------------ Common UI ------------
import Error from "./ui/Error";
import Home from "./ui/Home";
import AccountStatusProvider from "./ui/AccountStatusProvider";
import PublicRoute from "./ui/PublicRoute";

// ------------ Account UI ------------
import Login from "./features/account/Login";
import Register from "./features/account/Register";
import ResetPassword from "./features/account/ResetPassword";
import PreviousBookings from "./features/meetings/PreviousBookings";
import PrivateRoutes from "./ui/PrivateRoutes";

// Create the router
const router = createBrowserRouter([
  {
    element: <AccountStatusProvider />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/account",
        children: [
          {
            path: "login",
            element: (
              <PublicRoute>
                <Login />
              </PublicRoute>
            ),
          },
          {
            path: "register",
            element: (
              <PublicRoute>
                <Register />
              </PublicRoute>
            ),
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "previousBookings/:studentId",
        element: (
          <PrivateRoutes>
            <PreviousBookings />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;
