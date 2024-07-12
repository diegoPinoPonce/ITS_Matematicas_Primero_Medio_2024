import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from './ErrorPage';
import Login from "../views/login/Login";
import Signup from "../views/signup/Signup";
import Home from "../views/home/Home";
import Profile from "../views/profile/Profile";
import Practice from "../views/practice/Practice";
import ChatITS from "../views/chat/ChatITS";
import HistoryExercises from "../views/historyExcercises/HistoryExercises";
import BestStudents from "../views/beststudents/BestStudents";
import ProtectedRoute from "./ProtectedRoute";
import UpdateUserInfo from "../admin/UpdateUserInfo";
import Guide from "../views/guide/Guide";

// Usuario Admin
import HomeAdmin from "../admin/HomeAdmin";
import HistoryExcercisesStudents from "../admin/HistoryExcercisesStudents";


export const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
      errorElement: <ErrorPage />,
    },
    {
      element: <ProtectedRoute allowedRoles={['student']} />, // Wrapper para rutas de estudiante
      children: [
        {
          path: "/home",
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/profile",
          element: <Profile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/practice",
          element: <Practice />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/chat",
          element: <ChatITS />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/historyexercises",
          element: <HistoryExercises />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/beststudents",
          element: <BestStudents />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/guide",
          element: <Guide />,
          errorElement: <ErrorPage />,
        },
      ]
    },
    {
      element: <ProtectedRoute allowedRoles={['admin']} />,
      children: [
        {
          path: "/homeadmin",
          element: <HomeAdmin />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/historystudents/:id",
          element: <HistoryExcercisesStudents />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/updateUserInfo/:id",
          element: <UpdateUserInfo />,
          errorElement: <ErrorPage />,
        },
      ]
    },
]);