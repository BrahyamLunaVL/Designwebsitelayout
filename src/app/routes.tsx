import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { Favorites } from "./pages/Favorites";
import { Profile } from "./pages/Profile";
import { NewArrivals } from "./pages/NewArrivals";
import { BestSellers } from "./pages/BestSellers";
import { Sale } from "./pages/Sale";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
      { path: "favorites", element: <Favorites /> },
      { path: "profile", element: <Profile /> },
      { path: "new-arrivals", element: <NewArrivals /> },
      { path: "best-sellers", element: <BestSellers /> },
      { path: "sale", element: <Sale /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);