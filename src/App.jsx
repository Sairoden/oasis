// React & Libraries
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Styles
import GlobalStyles from "./styles/GlobalStyles";

// Pages
import {
  Dashboard,
  Account,
  Bookings,
  Cabins,
  Login,
  Settings,
  Users,
  PageNotFound,
  Booking,
  Checkin,
} from "./pages";

// UI Components
import { AppLayout, ErrorFallBack, ProtectedRoute } from "./ui";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      errorElement: <PageNotFound />,
      children: [
        {
          element: <AppLayout />,
          children: [
            {
              path: "/",
              element: <Navigate replace to="/dashboard" />,
            },
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
            {
              path: "/bookings",
              element: <Bookings />,
            },
            {
              path: "/bookings/:bookingId",
              element: <Booking />,
            },
            {
              path: "/checkin/:bookingId",
              element: <Checkin />,
            },
            {
              path: "/cabins",
              element: <Cabins />,
            },
            {
              path: "/users",
              element: <Users />,
            },
            {
              path: "/settings",
              element: <Settings />,
            },
            {
              path: "/account",
              element: <Account />,
            },
          ],
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;