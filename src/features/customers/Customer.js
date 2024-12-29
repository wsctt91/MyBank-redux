import { useSelector } from "react-redux";

function Customer() {
  //  从store中获取用户信息 -> customer
  const customer = useSelector((store) => store.customer.fullName);
  // console.log(customer);

  return <h2>👋 欢迎你 👩‍💼 - {customer}</h2>;
}

export default Customer;
