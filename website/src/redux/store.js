
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
//import storage from "redux-persist/lib/storage"; // localStorage for web
import userReducer from "./reducer/userReducer";


import storage from "redux-persist/lib/storage";

// 🔥 FIX (IMPORTANT)
const fixedStorage = storage?.default ? storage.default : storage;

// 🔥 ADD THIS LINE (IMPORTANT)
// const persistStorage = storage;
import { userApi } from "./api/userApi";
import { profileApi } from "./api/profileApi";




// ✅ Combine reducers
const rootReducer = combineReducers({
  
  
 
   user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
 
 
 
});

// ✅ Persist config (only persist user slice)
const persistConfig = {
  key: "root",
  storage: fixedStorage, // use the fixed storage
  whitelist: ["user"], // only user slice is persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }).concat(
      
      userApi.middleware,
      profileApi.middleware,
     
    ),
});

export const persistor = persistStore(store);
export default store;
