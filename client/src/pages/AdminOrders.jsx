import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    Package,
    User,
    IndianRupee,
    Clock,
    RefreshCw,
} from "lucide-react";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

import {
    getAllOrders,
    updateOrderStatus,
} from "../services/api";

const AdminOrders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingOrder, setUpdatingOrder] = useState(null);

    // =====================================================
    // ADMIN CHECK + FETCH ORDERS
    // =====================================================

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "admin") {
            navigate("/login");
            return;
        }

        fetchOrders();
    }, [navigate]);

    // =====================================================
    // FETCH ALL ORDERS
    // =====================================================

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const data = await getAllOrders();

            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching orders:", error);

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("user");

                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // UPDATE ORDER STATUS
    // =====================================================

    const handleStatusChange = async (orderId, status) => {
        try {
            setUpdatingOrder(orderId);

            const data = await updateOrderStatus(
                orderId,
                status
            );

            const updatedOrder = data?.order;

            if (updatedOrder) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId
                            ? updatedOrder
                            : order
                    )
                );
            } else {
                await fetchOrders();
            }
        } catch (error) {
            console.error(
                "Error updating order status:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to update order status"
            );
        } finally {
            setUpdatingOrder(null);
        }
    };

    // =====================================================
    // STATUS STYLE
    // =====================================================

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

            case "Processing":
                return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

            case "Shipped":
                return "bg-purple-500/10 text-purple-600 dark:text-purple-400";

            case "Cancelled":
                return "bg-red-500/10 text-red-600 dark:text-red-400";

            case "Placed":
                return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

            default:
                return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400";
        }
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f8faf7] dark:bg-zinc-950">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-500 dark:border-zinc-800 dark:border-t-emerald-500" />

                    <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Loading orders...
                    </p>
                </div>
            </main>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (
        <main className="min-h-screen bg-[#f8faf7] px-5 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-white">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
                                <ShoppingCart size={21} />
                            </div>

                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                                Orders
                            </span>

                        </div>

                        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Order Management
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            View and manage customer orders.
                        </p>
                    </div>

                    <Button
                        onClick={fetchOrders}
                        variant="outline"
                        className="rounded-full border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <RefreshCw
                            size={16}
                            className="mr-2"
                        />
                        Refresh
                    </Button>
                </div>

                {/* ORDER STATS */}

                <div className="mb-6 grid gap-4 sm:grid-cols-3">

                    {/* TOTAL */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                <ShoppingCart size={21} />
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Total Orders
                                </p>

                                <h2 className="text-2xl font-black">
                                    {orders.length}
                                </h2>
                            </div>

                        </div>
                    </Card>

                    {/* PLACED */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
                                <Clock size={21} />
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Placed
                                </p>

                                <h2 className="text-2xl font-black">
                                    {
                                        orders.filter(
                                            (order) =>
                                                order.orderStatus ===
                                                "Placed"
                                        ).length
                                    }
                                </h2>
                            </div>

                        </div>
                    </Card>

                    {/* DELIVERED */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                                <Package size={21} />
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Delivered
                                </p>

                                <h2 className="text-2xl font-black">
                                    {
                                        orders.filter(
                                            (order) =>
                                                order.orderStatus ===
                                                "Delivered"
                                        ).length
                                    }
                                </h2>
                            </div>

                        </div>
                    </Card>

                </div>

                {/* NO ORDERS */}

                {orders.length === 0 ? (
                    <Card className="rounded-3xl border-zinc-200 bg-white p-16 text-center dark:border-zinc-800 dark:bg-zinc-900">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                            <ShoppingCart size={28} />
                        </div>

                        <h2 className="mt-5 text-xl font-black">
                            No orders yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Customer orders will appear here.
                        </p>

                    </Card>
                ) : (

                    /* ORDERS */

                    <div className="space-y-5">

                        {orders.map((order) => (

                            <Card
                                key={order._id}
                                className="overflow-hidden rounded-3xl border-zinc-200/70 bg-white shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900"
                            >

                                {/* ORDER HEADER */}

                                <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 p-5 sm:flex-row sm:items-center dark:border-zinc-800">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Order ID
                                        </p>

                                        <h3 className="mt-1 font-black">
                                            #
                                            {order._id?.slice(-8)}
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4">

                                        <span className="text-sm text-zinc-500">
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </span>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                                                order.orderStatus
                                            )}`}
                                        >
                                            {order.orderStatus ||
                                                "Placed"}
                                        </span>

                                    </div>
                                </div>

                                {/* CUSTOMER + AMOUNT */}

                                <div className="grid gap-5 border-b border-zinc-100 p-5 sm:grid-cols-2 dark:border-zinc-800">

                                    {/* CUSTOMER */}

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                            <User size={18} />
                                        </div>

                                        <div>
                                            <p className="text-xs text-zinc-400">
                                                Customer
                                            </p>

                                            <p className="font-bold">
                                                {order.user?.name ||
                                                    "Customer"}
                                            </p>

                                            <p className="text-xs text-zinc-500">
                                                {order.user?.email ||
                                                    ""}
                                            </p>
                                        </div>

                                    </div>

                                    {/* AMOUNT */}

                                    <div className="flex items-center gap-3 sm:justify-end">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                                            <IndianRupee size={18} />
                                        </div>

                                        <div>
                                            <p className="text-xs text-zinc-400">
                                                Total Amount
                                            </p>

                                            <p className="text-xl font-black">
                                                ₹
                                                {Number(
                                                    order.totalAmount ||
                                                        0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* PRODUCTS */}

                                <div className="p-5">

                                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Products
                                    </p>

                                    <div className="space-y-3">

                                        {order.items?.map(
                                            (item, index) => {

                                                const product =
                                                    item.product;

                                                const productName =
                                                    product?.name ||
                                                    item.name ||
                                                    "Product";

                                                const productImage =
                                                    product?.image ||
                                                    item.image ||
                                                    "";

                                                return (
                                                    <div
                                                        key={
                                                            item._id ||
                                                            index
                                                        }
                                                        className="flex items-center justify-between rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
                                                    >

                                                        <div className="flex items-center gap-3">

                                                            {productImage ? (
                                                                <img
                                                                    src={
                                                                        productImage
                                                                    }
                                                                    alt={
                                                                        productName
                                                                    }
                                                                    className="h-14 w-14 rounded-xl object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-700">
                                                                    <Package
                                                                        size={
                                                                            22
                                                                        }
                                                                    />
                                                                </div>
                                                            )}

                                                            <div>
                                                                <p className="font-bold">
                                                                    {
                                                                        productName
                                                                    }
                                                                </p>

                                                                <p className="text-xs text-zinc-500">
                                                                    Quantity:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </p>
                                                            </div>

                                                        </div>

                                                        <p className="font-bold">
                                                            ₹
                                                            {Number(
                                                                item.price ||
                                                                    0
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </p>

                                                    </div>
                                                );
                                            }
                                        )}

                                    </div>
                                </div>

                                {/* UPDATE STATUS */}

                                <div className="flex flex-col gap-3 border-t border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Update Order Status
                                        </p>

                                        <p className="mt-1 text-xs text-zinc-500">
                                            Change the current order status.
                                        </p>
                                    </div>

                                    <select
                                        value={
                                            order.orderStatus ||
                                            "Placed"
                                        }
                                        disabled={
                                            updatingOrder ===
                                            order._id
                                        }
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                        className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-800"
                                    >
                                        <option value="Placed">
                                            Placed
                                        </option>

                                        <option value="Processing">
                                            Processing
                                        </option>

                                        <option value="Shipped">
                                            Shipped
                                        </option>

                                        <option value="Delivered">
                                            Delivered
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>

                                </div>

                            </Card>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
};

export default AdminOrders;