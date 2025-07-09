import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import NotFound from "./NotFound";
import Coins from "./Coins";
import Coin from "./Coin";
import Price from "./Price";
import Chart from "./Chart";

const router = createBrowserRouter(
  [
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
          children: [
            {
              path: "",
              element: <Price />,
            },
            {
              path: "price",
              element: <Price />,
            },
            {
              path: "chart",
              element: <Chart />,
            },
          ],
        },
      ],
      errorElement: <NotFound />,
    },
  ],
  {
    basename: "/react-crypto",
  }
);
export default router;
