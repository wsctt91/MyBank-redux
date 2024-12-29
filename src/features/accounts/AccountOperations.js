import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, requestLoan, withdraw, payLoan } from "./accountSlice";

// 用户账户操作组件
function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  // const exchangeRates = {
  //   USD: 1,
  //   EUR: 0.85,
  //   GBP: 0.72,
  //   JPY: 110.91,
  //   CNY: 7.2,
  // };

  const dispatch = useDispatch();
  // 从store中获取用户账户信息 -> account
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
    isLoading,
  } = useSelector((store) => store.account);

  console.log(balance);

  // 处理存款
  function handleDeposit() {
    if (!depositAmount || depositAmount <= 0 || !currency) return;

    // 汇率的转换
    dispatch(deposit(depositAmount, currency)); // dispatch action
    /* dispatch(deposit(depositAmount)); // dispatch action */
    setDepositAmount(""); // clear input
    setCurrency("USD"); // clear currency
  }
  // 处理取款
  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }
  // 处理贷款请求
  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }
  // 处理还贷
  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>请进行账户操作</h2>
      <div className="inputs">
        <div>
          <label>存款</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CNY">CNY</option>
          </select>

          <button onClick={() => handleDeposit()} disabled={isLoading}>
            {isLoading ? "换算中..." : `存入 ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>取款</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>取出 {withdrawalAmount}</button>
        </div>

        <div>
          <label>申请贷款</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="贷款金额"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="贷款用途"
          />
          <button onClick={handleRequestLoan}>贷款申请</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>
              你的贷款金额为 ${currentLoan} [{currentLoanPurpose}]
            </span>
            <button onClick={handlePayLoan}>偿还贷款</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
