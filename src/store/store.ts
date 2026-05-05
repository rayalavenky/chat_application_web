import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import forgotEmailReducer from './forgotEmailSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { api } from '../services/api';

//  Combine reducers
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userReducer,
  forgotPassword: forgotEmailReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'forgotPassword'], 
  //  DO NOT persist api (RTK Query cache)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(api.middleware),
});

//  Persistor
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
