import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { appSlice } from "./slices";

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage,
    },
    combineReducers({
      app: appSlice.reducer,
    }),
  ),
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       immutableCheck: true,
  //       serializableCheck: false,
  //     }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export const persistor = persistStore(store);
