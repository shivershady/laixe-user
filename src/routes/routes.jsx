import { lazy } from "react";

//---------------------------
// imports
//---------------------------
const Home = lazy(() => import("@pages/Home/index"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register")); // Thêm dòng này

//---------------------------
// exports
//---------------------------
export const routes_here = [
    {
        path: "/",
        element: <Home />,
        isPrivate: true,
    },
    {
        path: "/login",
        element: <Login />,
        isPrivate: false,
    },
    {
        path: "/register", // Thêm route mới cho trang đăng ký
        element: <Register />,
        isPrivate: false,
    },
    //routes in objects
];