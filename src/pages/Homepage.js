import NavBar from "../features/nav-bar/NavBar";
import ProductList from "../features/product/components/ProductList";

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
