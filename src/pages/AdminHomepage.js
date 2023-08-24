import NavBar from "../features/nav-bar/NavBar";
import AdminProductList from "../features/admin/AdminProductList";

function AdminHomepage() {
  return (
    <div>
      <NavBar>
        <AdminProductList></AdminProductList>
      </NavBar>
    </div>
  );
}

export default AdminHomepage;
