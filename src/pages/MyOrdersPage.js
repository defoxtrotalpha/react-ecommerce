import NavBar from "../features/nav-bar/NavBar";
import Order from "../features/order/Order";

function Homepage() {
  return (
    <div>
      <NavBar>
        <Order></Order>
      </NavBar>
    </div>
  );
}

export default Homepage;
