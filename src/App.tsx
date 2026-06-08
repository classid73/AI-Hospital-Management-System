import AppProvider_Wrappers from "providers";
import { RouterProvider } from "react-router";
import router from "routes";

export const App = () => {
  return (
    <AppProvider_Wrappers>
      <RouterProvider router={router} />
    </AppProvider_Wrappers>
  );
};

export default App;
