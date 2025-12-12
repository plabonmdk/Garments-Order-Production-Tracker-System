import { createBrowserRouter, Route } from "react-router";
import RootLayout from "../RootLayout";
import Home from "../home/Home";
import AllProducts from "../pages/all-products/AllProducts";
import About from "../pages/about/About";
import Contact from "../pages/contoct/Contact";


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
]);