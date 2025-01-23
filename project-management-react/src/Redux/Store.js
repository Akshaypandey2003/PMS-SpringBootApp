import { legacy_createStore,combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Fix import (no curly braces needed)
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage for web)
import subscriptionReducer from "./Subscription/Reducer";
import { authReducer } from "./Auth/Reducer";
import { projectReducer } from "./Project/Reducer";
import ChatReducer from "./Chat/Reducer";
import commentReducer from "./Comment/Reducer";
import issueReducer from "./Issues/Reducer";

// Combine reducers
const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  chat: ChatReducer,
  comment: commentReducer,
  issue: issueReducer,
  subscription: subscriptionReducer,
});

// Root reducer to handle global actions like LOGOUT
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // Clear persisted storage and reset Redux state
    storage.removeItem("persist:root"); // Clear the persisted data
    state = undefined; // Reset the state
  }
  return appReducer(state, action);
};

// Persist configuration
const persistConfig = {
  key: "root", // Key for the storage
  storage, // Storage engine
  whitelist: ["project", "auth", "chat", "comment", "issue", "subscription"], // Specify the states to persist
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer and middleware
export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

// Persistor to handle rehydration
export const persistor = persistStore(store);
