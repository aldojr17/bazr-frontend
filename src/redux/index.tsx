import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import { IUserState } from "./user/types";
import { ICartState } from "./cart/types";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";

export interface RootState {
  userReducer: IUserState;
  cartReducer: ICartState;
}

const persistConfig = {
  key: "persistedRedux",
  storage,
  whitelist: ["cartReducer"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers<RootState>({
    userReducer,
    cartReducer,
  })
);

const store = createStore(persistedReducer, applyMiddleware(logger, thunk));

export const persistor = persistStore(store);

export default store;
