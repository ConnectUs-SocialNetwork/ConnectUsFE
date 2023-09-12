import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";
import { queryClient } from "./util/http.js";
import { QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthenticationPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
