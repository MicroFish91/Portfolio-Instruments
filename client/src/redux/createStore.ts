import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import persistedReducer from "./reducers";

export const middlewares = [logger];

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {
  store,
  persistor,
};
