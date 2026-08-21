import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Package, MapPin, CreditCard, CheckCircle2, } from "lucide-react";
import { Button } from "../components/ui/button";
import { getOrderById } from "../services/api";

const OrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getOrderById(id);

                setOrder(data);
            } catch (error) {
                console.error("Error fetching order:", error);

                setError(
                    error?.response?.data?.message ||
                        "Unable to load order details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center">
                    <Loader2
                        size={38}
                        className="animate-spin text-emerald-500"
                    />

                    <p className="mt-3 text-sm text-zinc-500">
                        Loading order...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
                <Package
                    size={55}
                    className="mb-4 text-red-500"
                />

                <h1 className="text-3xl font-black">
                    Order not found
                </h1>

                <p className="mt-2 text-zinc-500">
                    {error || "Unable to find this order."}
                </p>

                <Link to="/orders" className="mt-6">
                    <Button className="rounded-full bg-emerald-500 px-6 text-black hover:bg-emerald-400">
                        Back to Orders
                    </Button>
                </Link>
            </div>
        );
    }


    const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const totalItems = order.items?.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <main className="min-h-screen bg-[#f8faf7] px-6 py-12 text-zinc-900 dark:bg-zinc-950 dark:text-white">
            <div className="mx-auto max-w-6xl">

                {/* BACK */}

                <Link
                    to="/orders"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-emerald-500"
                >
                    <ArrowLeft size={17} />
                    Back to Orders
                </Link>

                {/* HEADER */}

                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                        Order Details
                    </p>

                    <h1 className="mt-3 text-4xl font-black">
                        #{order._id?.slice(-8)}
                    </h1>

                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                        Placed on {orderDate}
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* ================= LEFT ================= */}

                    <div className="space-y-6">

                        {/* ORDER STATUS */}

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2
                                        size={24}
                                        className="text-emerald-500"
                                    />

                                    <div>
                                        <h2 className="font-black">
                                            Order Status
                                        </h2>

                                        <p className="text-sm text-zinc-500">
                                            Your order is currently being processed.
                                        </p>
                                    </div>
                                </div>

                                <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-bold capitalize text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                                    {order.orderStatus}
                                </span>
                            </div>
                        </div>

                        {/* ITEMS */}

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">

                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-black">
                                    Items
                                </h2>

                                <span className="text-sm text-zinc-500">
                                    {totalItems} items
                                </span>
                            </div>

                            <div className="mt-6 space-y-5">

                                {order.items?.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex gap-4 border-b border-zinc-100 pb-5 last:border-0 last:pb-0 dark:border-zinc-800"
                                    >

                                        {/* IMAGE */}

                                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    🛍️
                                                </div>
                                            )}
                                        </div>

                                        {/* INFO */}

                                        <div className="flex-1">
                                            <h3 className="font-bold">
                                                {item.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-zinc-500">
                                                Quantity: {item.quantity}
                                            </p>

                                            <p className="mt-2 font-black">
                                                ₹
                                                {item.price?.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>
                                        </div>

                                        {/* ITEM TOTAL */}

                                        <div className="text-right">
                                            <p className="font-black">
                                                ₹
                                                {(
                                                    item.price *
                                                    item.quantity
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* SHIPPING ADDRESS */}

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">

                            <div className="flex items-center gap-3">
                                <MapPin
                                    size={22}
                                    className="text-emerald-500"
                                />

                                <h2 className="text-xl font-black">
                                    Shipping Address
                                </h2>
                            </div>

                            <div className="mt-5 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">

                                <p className="font-bold">
                                    {order.shippingAddress?.fullName}
                                </p>

                                <p>
                                    {order.shippingAddress?.address}
                                </p>

                                <p>
                                    {order.shippingAddress?.city},{" "}
                                    {order.shippingAddress?.state}
                                </p>

                                <p>
                                    Pincode:{" "}
                                    {order.shippingAddress?.pincode}
                                </p>

                                <p>
                                    Phone:{" "}
                                    {order.shippingAddress?.phone}
                                </p>

                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT ================= */}

                    <div className="h-fit space-y-6">

                        {/* SUMMARY */}

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">

                            <h2 className="text-xl font-black">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between text-sm text-zinc-500">
                                    <span>Items</span>
                                    <span>
                                        {totalItems}
                                    </span>
                                </div>

                                <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                <div className="flex justify-between text-xl font-black">
                                    <span>Total</span>

                                    <span>
                                        ₹
                                        {order.totalAmount?.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* PAYMENT */}

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">

                            <div className="flex items-center gap-3">
                                <CreditCard
                                    size={22}
                                    className="text-emerald-500"
                                />

                                <h2 className="font-black">
                                    Payment
                                </h2>
                            </div>

                            <div className="mt-4 flex items-center justify-between">

                                <div>
                                    <p className="font-semibold">
                                        Cash on Delivery
                                    </p>

                                    <p className="text-sm text-zinc-500">
                                        Pay when your order arrives.
                                    </p>
                                </div>

                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                                    {order.paymentStatus}
                                </span>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderDetails;