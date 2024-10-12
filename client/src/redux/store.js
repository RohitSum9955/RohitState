import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

//create combined reducer  which comes from redux toolkit
const rootReducer = combineReducers({user: userReducer})

// Define the persist config
const persistConfig = {
  key: 'root',
  storage,
  version:1,
}
//create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  // reducer: {user: userReducer},
  //after adding persist reducing  we can remove userReducer 
  reducer: persistedReducer,
  //add middleware adn check serializable because remove error form this page
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
//  export default store;
export const persistor = persistStore(store);
