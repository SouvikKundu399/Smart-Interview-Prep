import {createBrowserRouter} from "react-router";
import App from "../App";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import {Protected} from "../features/auth/components/Protected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);