import CreateCustomer from "./features/customers/CreateCustomer.js";
import Customer from "./features/customers/Customer.js";
import AccountOperations from "./features/accounts/AccountOperations.js";
import BalanceDisplay from "./features/accounts/BalanceDisplay.js";

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
