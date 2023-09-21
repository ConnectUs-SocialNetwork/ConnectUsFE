import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";
import { queryClient } from "./util/http.js";
import { QueryClientProvider } from '@tanstack/react-query';
import Root from "./pages/Root.js";
import Help from "./components/Help.js";
import Home from "./pages/Home.js";
import Feed from "./pages/Feed.js";

const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthenticationPage />,
  },
  {
    path: "help",
    element: <Help />
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Feed />
      },
      {
        path: "/my-network",
        element: <p>My network</p>
      },
      {
        path: "/notifications",
        element: <p>Notifications</p>
      }
    ]
  }
]);

function App() {
  console.log("Render iz App komponente");

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
