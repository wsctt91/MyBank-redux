import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
// 导入store
import store from "./store";

// 测试store dispatch来触发action
// store.dispatch({ type: "account/deposit", payload: 400 });
// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Provider是提供提供Redux中的store给reactjs */}
    {/* 广播所有的全局状态到每个想要读取store的组件 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
