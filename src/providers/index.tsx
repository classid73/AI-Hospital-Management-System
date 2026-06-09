import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import type { AppProviderProps } from "typescript/interfaces";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeCustomization } from "themes";

const AppProvider_Wrappers = ({ children }: AppProviderProps) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeCustomization>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ThemeCustomization>
        </PersistGate>
      </Provider>
    </>
  );
};

export default AppProvider_Wrappers;
