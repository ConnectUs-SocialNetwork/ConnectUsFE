import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";
import Root from "./pages/Root.js";
import Feed from "./pages/Feed.js";
import AllSearchedUsersPage from "./pages/AllSearchedUsersPage.js";
import PostsList from "./components/Profile/NavPages/Posts/PostsList.js";
import UserProfilePage from "./pages/UserProfilePage.js";
import Friends from "./components/Profile/NavPages/Friends/Friends.js";
import FriendsNavPage from "./components/Profile/NavPages/Friends/FriendsNvPage.js";
import MutualFriends from "./components/Profile/NavPages/Friends/MutualFriends.js";
import MyProfilePage from "./pages/MyProfilePage.js";
import MyFriends from "./components/MyProfile/NavPages/Friends/MyFriends.js";
import MyPostsList from "./components/MyProfile/NavPages/Posts/MyPostsList.js";
import EditProfileForm from "./components/Page/CreatePageForm.js";
import CreatePageForm from "./components/Page/CreatePageForm.js";
import ViewPage from "./pages/ViewPage.js";
import PagePostsList from "./components/Page/ViewPage/NavPages/PagePostsList.js";
import Likers from "./components/Page/ViewPage/NavPages/Likers.js";

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
        element: <EditProfileForm />
      },
      {
        path: "createPage",
        element: <CreatePageForm />
      },
      {
        path: "viewPage/:pageId/:administratorId",
        element: <ViewPage />,
        children: [
          {
            index: true,
            element: <PagePostsList />
          },
          {
            path: "likes",
            element: <Likers />
          }
        ]
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
      },
      {
        path: "/viewMyProfile",
        element: <MyProfilePage />,
        children: [
          {
            index: true,
            element: <MyPostsList />
          },
          {
            path: "friends",
            element: <MyFriends />,
            
          }
        ]
      }
    ]
  }
]);

function App() {

  return (
      <RouterProvider router={router} />
  );
}

export default App;
