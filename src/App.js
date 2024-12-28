import CreateCustomer from "./features/customers/CreateCustomer.js";
import Customer from "./features/customers/Customer.js";
import AccountOperations from "./features/accounts/AccountOperations.js";
import BalanceDisplay from "./features/accounts/BalanceDisplay.js";
import { useSelector } from "react-redux";

function App() {
  const fullName = useSelector((state) => state.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
