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
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)} // onChange事件代表输入框内容发生变化时触发
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default CreateCustomer;
