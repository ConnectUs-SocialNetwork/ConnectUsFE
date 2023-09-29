import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";
import Root from "./pages/Root.js";
import Feed from "./pages/Feed.js";
import AllSearchedUsersPage from "./pages/AllSearchedUsersPage.js";
import Help from "./pages/Help.js";
import PostsList from "./components/Profile/NavPages/Posts/PostsList.js";
import UserProfilePage from "./pages/UserProfilePage.js";
import Friends from "./components/Profile/NavPages/Friends/Friends.js";
import FriendsNavPage from "./components/Profile/NavPages/Friends/FriendsNvPage.js";
import MutualFriends from "./components/Profile/NavPages/Friends/MutualFriends.js";

const router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthenticationPage />,
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
      }, 
      {
        path: "/searchedUsers/:searchText",
        element: <AllSearchedUsersPage />
      },
      {
        path: "help",
        element: <Help />
      },
      {
        path: "/viewUserProfile/:userId",
        element: <UserProfilePage />,
        children: [
          {
            index: true,
            element: <PostsList />
          },
          {
            path: "friends",
            element: <FriendsNavPage />,
            children: [
              {
                index: true,
                element: <Friends />
              },
              {
                path: "mutual",
                element: <MutualFriends />
              }
            ]
          }
        ]
      }
    ]
  }
]);

function App() {
  console.log("Render iz App komponente");

  return (
      <RouterProvider router={router} />
  );
}

export default App;
