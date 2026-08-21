import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/ui/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";

import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                {/* ================= PUBLIC ================= */}

                <Route path="/" element={<Home />} />

                <Route path="/products" element={<Products />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                {/* ================= USER ================= */}

                <Route path="/cart" element={<Cart />} />

                <Route path="/orders" element={<MyOrders />} />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/orders/:id"
                    element={<OrderDetails />}
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/products"
                    element={<AdminProducts />}
                />

                <Route
                    path="/admin/users"
                    element={<AdminUsers />}
                />

                <Route
                    path="/admin/orders"
                    element={<AdminOrders />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;