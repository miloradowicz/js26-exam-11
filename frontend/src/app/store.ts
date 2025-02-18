import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { users } from '../store/slices/usersSlice';
import { newProductReducer } from '../store/slices/newProductSlice';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { productsReducer } from '../store/slices/productsSlice';

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const reducer = combineReducers({
  users: persistReducer(usersPersistConfig, users),
  newProduct: newProductReducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
