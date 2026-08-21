import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingBag, Clock, CheckCircle, XCircle, Truck, RefreshCw, } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { getMyOrders } from "../services/api";

const MyOrders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetchOrders();
    }, [navigate]);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const data = await getMyOrders();

            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching orders:", error);

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("role");

                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Delivered":
                return <CheckCircle size={16} />;

            case "Cancelled":
                return <XCircle size={16} />;

            case "Shipped":
                return <Truck size={16} />;

            case "Processing":
                return <Package size={16} />;

            case "Placed":
            default:
                return <Clock size={16} />;
        }
    };

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
            default:
                return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatPrice = (price) => {
        return Number(price || 0).toLocaleString("en-IN");
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f8faf7] dark:bg-zinc-950">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-500 dark:border-zinc-800 dark:border-t-emerald-500" />

                    <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Loading your orders...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8faf7] px-5 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-white sm:px-8">
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}

                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
                                <ShoppingBag size={21} />
                            </div>

                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                                My Orders
                            </span>
                        </div>

                        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Order History
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            View and track your orders.
                        </p>
                    </div>

                    <Button
                        onClick={fetchOrders}
                        variant="outline"
                        className="rounded-full border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <RefreshCw size={16} className="mr-2" />
                        Refresh
                    </Button>
                </div>

                {/* NO ORDERS */}

                {orders.length === 0 ? (
                    <Card className="rounded-3xl border-zinc-200 bg-white p-16 text-center dark:border-zinc-800 dark:bg-zinc-900">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                            <ShoppingBag size={28} />
                        </div>

                        <h2 className="mt-5 text-xl font-black">
                            No orders yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Your orders will appear here.
                        </p>

                        <Button
                            onClick={() => navigate("/products")}
                            className="mt-6 rounded-full bg-emerald-500 text-black hover:bg-emerald-400"
                        >
                            Start Shopping
                        </Button>

                    </Card>
                ) : (

                    /* ORDERS */

                    <div className="space-y-5">

                        {orders.map((order) => {

                            // IMPORTANT:
                            // Backend field is orderStatus
                            const status = order.orderStatus || "Placed";

                            return (
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
                                                {order._id
                                                    ? order._id.slice(-8)
                                                    : "N/A"}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-4">

                                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                                {formatDate(order.createdAt)}
                                            </span>

                                            <span
                                                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                                                    status
                                                )}`}
                                            >
                                                {getStatusIcon(status)}

                                                {status}
                                            </span>

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

                                                    const productName =
                                                        item.product?.name ||
                                                        item.name ||
                                                        "Product";

                                                    const productImage =
                                                        item.product?.image ||
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

                                                            {/* PRODUCT INFO */}

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

                                                            {/* ITEM PRICE */}

                                                            <p className="font-bold">
                                                                ₹
                                                                {formatPrice(
                                                                    item.price
                                                                )}
                                                            </p>

                                                        </div>
                                                    );
                                                }
                                            )}

                                        </div>
                                    </div>

                                    {/* SHIPPING ADDRESS */}

                                    {order.shippingAddress && (
                                        <div className="border-t border-zinc-200 p-5 dark:border-zinc-800">

                                            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                                Shipping Address
                                            </p>

                                            <div className="rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-zinc-800/50">

                                                <p className="font-bold">
                                                    {
                                                        order.shippingAddress
                                                            .fullName
                                                    }
                                                </p>

                                                <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                                                    {
                                                        order.shippingAddress
                                                            .phone
                                                    }
                                                </p>

                                                <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                                                    {
                                                        order.shippingAddress
                                                            .address
                                                    }
                                                    ,{" "}
                                                    {
                                                        order.shippingAddress
                                                            .city
                                                    }
                                                    ,{" "}
                                                    {
                                                        order.shippingAddress
                                                            .state
                                                    }{" "}
                                                    -{" "}
                                                    {
                                                        order.shippingAddress
                                                            .pincode
                                                    }
                                                </p>

                                            </div>
                                        </div>
                                    )}

                                    {/* PAYMENT */}

                                    <div className="border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">

                                        <div className="flex items-center justify-between text-sm">

                                            <span className="font-bold text-zinc-500">
                                                Payment
                                            </span>

                                            <span className="font-bold">
                                                {order.paymentMethod || "COD"}
                                            </span>

                                        </div>

                                        <div className="mt-2 flex items-center justify-between text-sm">

                                            <span className="font-bold text-zinc-500">
                                                Payment Status
                                            </span>

                                            <span
                                                className={`font-bold ${
                                                    order.paymentStatus ===
                                                    "Paid"
                                                        ? "text-emerald-500"
                                                        : "text-yellow-500"
                                                }`}
                                            >
                                                {order.paymentStatus ||
                                                    "Pending"}
                                            </span>

                                        </div>

                                    </div>

                                    {/* TOTAL */}

                                    <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-800/40">

                                        <span className="text-sm font-bold text-zinc-500">
                                            Total Amount
                                        </span>

                                        <span className="text-xl font-black text-emerald-500">
                                            ₹
                                            {formatPrice(
                                                order.totalAmount
                                            )}
                                        </span>

                                    </div>

                                </Card>
                            );
                        })}

                    </div>
                )}

            </div>
        </main>
    );
};

export default MyOrders;