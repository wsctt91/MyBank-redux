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
    // const convertedAmount = depositAmount * exchangeRates[currency];
    dispatch(deposit(depositAmount, currency)); // dispatch action
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
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
            <option value="JPY">Japanese Yen</option>
            <option value="CNY">Chinese Yuan</option>
          </select>

          <button onClick={() => handleDeposit()} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan} [{currentLoanPurpose}]
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
