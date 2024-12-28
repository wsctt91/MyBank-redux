// 用户账户初始状态
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// 用户账户reducer
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // 存款
    case "account/deposit":
      if (action.payload <= 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    // 取款
    case "account/withdraw":
      if (action.payload <= 0 || action.payload > state.balance) return state;
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    // 贷款
    case "account/requestLoan":
      if (state.loan > 0 || action.payload.amount <= 0) return state;
      //   later we can add more conditions here
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    // 还贷
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    // 兑换货币中 用于异步操作
    case "convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }
  //  异步函数  thunk
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    // API call to convert currency
    const res = await fetch(
      //  获得最新的汇率frankfurter.app
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const convertedAmount = data.rates.USD;

    //  return action;
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
