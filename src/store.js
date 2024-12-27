import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// 合并reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
// 创建store
const store = createStore(rootReducer);

export default store;
