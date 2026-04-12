import { useState } from "react";
import CartManagementPage from "../pages/CartManagementPage.jsx";
import ProductManagementPage from "../pages/ProductManagementPage.jsx";

function AppRoutes() {
  const [activeView, setActiveView] = useState("products");

  if (activeView === "cart") {
    return <CartManagementPage onGoToProducts={() => setActiveView("products")} />;
  }

  return <ProductManagementPage onGoToCart={() => setActiveView("cart")} />;
}

export default AppRoutes;
