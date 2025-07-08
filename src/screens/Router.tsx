import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import About from "./About";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
export default router;
