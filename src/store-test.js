import { combineReducers, createStore } from "redux";

// 用户账户初始状态
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
// 用户信息初始状态
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// 用户账户reducer
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //   later we can add more conditions here
      return {
        ...state,
        loan: action.payload.amount,
        LoanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payloan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}
// 用户信息reducer
function customerReducer(state = initialStateCustomer, action) {
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

// 合并reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
// 创建store
const store = createStore(rootReducer);

/* store.dispatch({ type: "account/deposit", payload: 500 });
console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amonut: 1000, purpose: "Buy a car." },
});
console.log(store.getState());

store.dispatch({ type: "account/payloan" });
console.log(store.getState()); */

// Action creators
// const ACCOUNT_DEPOSIT = "account/deposit";

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a car."));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

// Customer actions
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, creartedAt: new Date().toISOString() },
  };
}
// Update customer name
function updateName(fullName) {
  return {
    type: "account/updateName",
    payload: { fullName },
  };
}

store.dispatch(createCustomer("ttsc", "123345567"));
console.log(store.getState());
store.dispatch(deposit(1000));
console.log(store.getState());
