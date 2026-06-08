import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import type { AppProviderProps } from "typescript/interfaces";

const AppProvider_Wrappers = ({ children }: AppProviderProps) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default AppProvider_Wrappers;
