// *applyMiddleware是redux的一个中间件，用于处理异步操作
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
// *composeWithDevTools是一个用于redux调试的工具，可以在chrome中安装redux-devtools插件
import { composeWithDevTools } from "redux-devtools-extension";

import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

/* 使用redux-thunk来处理异步操作 */

// 合并reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
// 创建store applyMiddleware标识使用中间件
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
