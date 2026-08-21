import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Clock, Truck, CheckCircle, XCircle, IndianRupee, ShoppingBag, RefreshCw, } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { getMyOrders } from "../services/api";

const Orders = () => {
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
                localStorage.removeItem("role");
                localStorage.removeItem("user");

                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Processing":
                return <Package size={17} />;

            case "Shipped":
                return <Truck size={17} />;

            case "Delivered":
                return <CheckCircle size={17} />;

            case "Cancelled":
                return <XCircle size={17} />;

            default:
                return <Clock size={17} />;
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Processing":
                return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

            case "Shipped":
                return "bg-purple-500/10 text-purple-600 dark:text-purple-400";

            case "Delivered":
                return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

            case "Cancelled":
                return "bg-red-500/10 text-red-600 dark:text-red-400";

            default:
                return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
        }
    };

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
            <div className="mx-auto max-w-5xl">

                {/* HEADER */}

                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
                                <ShoppingBag size={21} />
                            </div>

                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                                Orders
                            </span>
                        </div>

                        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            My Orders
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
                        <RefreshCw
                            size={16}
                            className="mr-2"
                        />
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
                            Your orders will appear here after you place an order.
                        </p>

                        <Button
                            onClick={() => navigate("/products")}
                            className="mt-6 rounded-full bg-emerald-500 text-black hover:bg-emerald-400"
                        >
                            Continue Shopping
                        </Button>
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

                                        <p className="mt-1 text-xs text-zinc-500">
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </p>
                                    </div>

                                    {/* STATUS */}

                                    <span
                                        className={`flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${getStatusStyle(
                                            order.status
                                        )}`}
                                    >
                                        {getStatusIcon(
                                            order.status
                                        )}

                                        {order.status ||
                                            "Pending"}
                                    </span>
                                </div>

                                {/* ORDER ITEMS */}

                                <div className="p-5">
                                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        Items
                                    </p>

                                    <div className="space-y-3">
                                        {order.items?.map(
                                            (item, index) => (
                                                <div
                                                    key={
                                                        item._id ||
                                                        index
                                                    }
                                                    className="flex items-center justify-between rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
                                                >
                                                    <div className="flex items-center gap-3">

                                                        {item.product
                                                            ?.image ? (
                                                            <img
                                                                src={
                                                                    item
                                                                        .product
                                                                        .image
                                                                }
                                                                alt={
                                                                    item
                                                                        .product
                                                                        .name ||
                                                                    "Product"
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
                                                                {item
                                                                    .product
                                                                    ?.name ||
                                                                    "Product"}
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
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* TOTAL */}

                                <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                            Total Amount
                                        </p>

                                        <p className="mt-1 text-xl font-black">
                                            ₹
                                            {Number(
                                                order.totalAmount ||
                                                    0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                        <IndianRupee size={20} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Orders;