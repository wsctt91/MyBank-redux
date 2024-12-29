import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

// 用户信息组件
function CreateCustomer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  // useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  // 从store中获取用户信息 -> customer
  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
    setFullName("");
    setNationalId("");
  }

  return (
    <div>
      <h2>账户登录 & 注册</h2>
      <div className="inputs">
        <div>
          <label>请输入您的账号</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>请输入您的ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)} // onChange事件代表输入框内容发生变化时触发
          />
        </div>
        <button onClick={handleClick}>创建一个新的账户</button>
      </div>
    </div>
  );
}

export default CreateCustomer;
