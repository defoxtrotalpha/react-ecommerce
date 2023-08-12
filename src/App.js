import "./App.css";
import SignUp from "./features/auth/components/SignUp";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import Protected from "./features/auth/Protected";
import { useDispatch, useSelector } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Homepage></Homepage>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/SignUp",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
