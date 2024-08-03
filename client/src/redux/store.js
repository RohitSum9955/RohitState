import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice';

export const store = configureStore({
  reducer: {user: userReducer},
  //add middleware adn check serializable because remove error form this page
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;