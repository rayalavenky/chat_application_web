// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/AuthApi';
import userReducer from '../services/userSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});