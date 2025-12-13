import { createBrowserRouter, Route } from "react-router";
import RootLayout from "../RootLayout";
import Home from "../home/Home";
import AllProducts from "../pages/all-products/AllProducts";
import About from "../pages/about/About";
import Contact from "../pages/contoct/Contact";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'all-products',
          element: <AllProducts></AllProducts>
        },
        {
          path: 'contact',
          element: <Contact></Contact>
        },
        {
          path: 'about',
          element: <About></About>
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword
      }
    ]
  }
]);