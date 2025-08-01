import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import UserProvider from "./context/User.context";
import CardDetails from "./pages/CardDetails/CardDetails";
import ViewAll from "./pages/ViewAll/ViewAll";
import { FavoriteProvider } from "./context/Favorite.Context";
import Favorite from "./pages/Favorite/Favorite";
import Profile from "./pages/Profile/Profile";
import Movies from "./pages/Movies/Movies";
import TvShows from "./pages/TvShows/TvShows";
import Series from "./pages/Series/Series";
import NotAuth from "./components/NotAuth/NotAuth";
import NotFound from "./pages/NotFound/NotFound";
import Genres from "./pages/Genres/Genres";

// ✅ AOS import
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  // ✅ Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "CardDetails/:type/:id", element: <CardDetails /> },
        { path: "ViewAll", element: <ViewAll /> },
        { path: "Favorite", element: <Favorite /> },
        { path: "profile", element: <Profile /> },
        { path: "movies", element: <Movies /> },
        { path: "Tvshows", element: <TvShows /> },
        { path: "Series", element: <Series /> },
        { path: "NotAuth", element: <NotAuth /> },
        { path: "viewgenres", element: <Genres /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <UserProvider>
      <FavoriteProvider>
        <RouterProvider router={router} />
      </FavoriteProvider>
    </UserProvider>
  );
}

export default App;
