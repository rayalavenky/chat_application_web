import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../services/AuthApi';
import userReducer from './userSlice';
import forgotEmailReducer from './forgotEmailSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

//  Combine reducers
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  user: userReducer,
  forgotPassword: forgotEmailReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'forgotPassword'], 
  //  DO NOT persist authApi (RTK Query cache)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(authApi.middleware),
});

//  Persistor
export const persistor = persistStore(store);