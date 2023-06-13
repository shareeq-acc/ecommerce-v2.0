import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../common/components/Elements/Footer/Footer";
import Navbar from "../common/components/Elements/Navbar/Navbar";
import AuthPage from "../common/pages/AuthPage/AuthPage";
import HomePage from "../common/pages/HomePage/Home";
import LoginPage from "../common/pages/LoginPage/LoginPage";
import ProductPage from "../common/pages/ProductPage/ProductPage";
import SearchPage from "../common/pages/SearchPage/SearchPage";
import Cart from "../common/components/Elements/Cart/Cart";
import CheckoutPage from "../common/pages/CheckoutPage/CheckoutPage";
import Account from "../common/pages/AccountPage/Account";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

function App() {
  const [showCart, setShowCart] = useState<Boolean>(false);
  const token = useSelector(selectToken)

  return (
    <div className="App">
      <Navbar setShowCart={setShowCart} showCart={showCart} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/user/account" element={<Account />} />
      </Routes>
      <Cart setCartState={setShowCart} cartState={showCart} />
      <Footer />
    </div>
  );
}

export default App;
