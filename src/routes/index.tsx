import { Home_Page, Landing_Page } from "pages/Landing";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Landing_Page />,
      children: [
        {
          index: true,
          element: <Home_Page />,
        },
      ],
    },
  ],
  //   { basename: import.meta.env.VITE_APP_BASE_NAME },
);
export default router;
