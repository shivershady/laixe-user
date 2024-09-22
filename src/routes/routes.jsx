import { lazy } from "react";

//---------------------------
// imports
//---------------------------
const Home = lazy(() => import("@pages/Home/index"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const ExamSimulation = lazy(() => import("@pages/ExamSimulation/index")); // Assuming you have this page
const Theory = lazy(() => import("@pages/Theory/index")); // Assuming you have this page
const PurchaseLayOut = lazy(() => import("@pages/Purchase/index")); // Assuming you have this page
const Purchase = lazy(() => import("@pages/Purchase/Purchase")); // Assuming you have this page
const PaymentSuccess = lazy(() => import("@pages/Purchase/PaymentSuccess")); // Assuming you have this page
const MyProfile = lazy(() => import("@pages/MyProfile")); // Assuming you have this page

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
        path: "/mua-ky-hoc", // Purchase route
        element: <PurchaseLayOut />,
        isPrivate: true,
        useLayout: true,
        children: [ // Thêm children cho route này
            {
                path: "",
                element: <Purchase />,
                isPrivate: true,
                useLayout: false,
            },
            {
                path: "payment-success", // Đường dẫn cho children
                element: <PaymentSuccess />, // Component cho children
                isPrivate: true,
                useLayout: false,
            },
        ],
    },
    {
        path: "/my-profile", // Thêm route cho trang MyProfile
        element: <MyProfile />,
        isPrivate: true,
        useLayout: true,
    },
];