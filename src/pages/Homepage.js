import NavBar from "../features/nav-bar/NavBar";
import ProductList from "../features/product-list/ProductList";

function Homepage() {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
    </div>
  );
}

export default Homepage;
