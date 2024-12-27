// 用户信息初始状态
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// 用户信息reducer
export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
}

// Customer actions
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, creartedAt: new Date().toISOString() },
  };
}
// Update customer name
export function updateName(fullName) {
  return {
    type: "account/updateName",
    payload: { fullName },
  };
}
