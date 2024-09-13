import { lazy } from "react";

//---------------------------
// imports
//---------------------------
const Home = lazy(() => import("@pages/Home/index"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const ExamSimulation = lazy(() => import("@pages/ExamSimulation/index")); // Assuming you have this page
const Theory = lazy(() => import("@pages/Theory/index")); // Assuming you have this page
const Purchase = lazy(() => import("@pages/Purchase/index")); // Assuming you have this page

//---------------------------
// exports
//---------------------------
export const routes_here = [
    {
        path: "/",
        element: <Home />,
        isPrivate: false,
        useLayout: true,
    },
    {
        path: "/login",
        element: <Login />,
        isPrivate: false,
        useLayout: false,
    },
    {
        path: "/register",
        element: <Register />,
        isPrivate: false,
        useLayout: false,
    },
    {
        path: "/mo-phong/:examId", // Exam Simulation route
        element: <ExamSimulation />,
        isPrivate: true,
        useLayout: true,
    },
    {
        path: "/ly-thuyet/:examId", // Theory route
        element: <Theory />,
        isPrivate: true,
        useLayout: true,
    },
    {
        path: "/mua-ky-hoc/:examId", // Purchase route
        element: <Purchase />,
        isPrivate: true,
        useLayout: true,
    },
];