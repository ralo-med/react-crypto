import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import NotFound from "./NotFound";

import Coins from "./Coins";
import Coin from "./Coin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },

      {
        path: ":coinId",
        element: <Coin />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
export default router;
