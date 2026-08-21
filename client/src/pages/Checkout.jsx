import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { getCart, createOrder } from "../services/api";

const Checkout = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
        paymentMethod: "COD",
    });

    // ================= LOAD CART =================

    useEffect(() => {
        const loadCart = async () => {
            try {
                const data = await getCart();
                setCart(data);
            } catch (error) {
                console.error("Error loading cart:", error);
                setError(
                    error.response?.data?.message ||
                    "Unable to load cart."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    // ================= INPUT CHANGE =================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ================= PLACE ORDER =================

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        setError("");

        if (!cart || cart.items?.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        try {
            setPlacingOrder(true);

            const orderData = {
                shippingAddress: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    pincode: formData.pincode,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                },
                paymentMethod: formData.paymentMethod,
            };

            const order = await createOrder(orderData);

            console.log("Order created:", order);

            alert("Order placed successfully! 🎉");

            navigate("/orders");
        } catch (error) {
            console.error("Place order error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to place order. Please try again."
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center">
                    <Loader2
                        size={35}
                        className="animate-spin text-emerald-500"
                    />

                    <p className="mt-3 text-zinc-500">
                        Loading checkout...
                    </p>
                </div>
            </div>
        );
    }

    // ================= EMPTY CART =================

    if (!cart || cart.items?.length === 0) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
                <ShoppingBag
                    size={55}
                    className="mb-4 text-emerald-500"
                />

                <h1 className="text-3xl font-black">
                    Your cart is empty
                </h1>

                <p className="mt-2 text-zinc-500">
                    Add some products before checkout.
                </p>

                <Link to="/products" className="mt-6">
                    <Button className="rounded-full bg-emerald-500 px-6 text-black hover:bg-emerald-400">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8faf7] px-6 py-12 text-zinc-900 dark:bg-zinc-950 dark:text-white">
            <div className="mx-auto max-w-6xl">

                {/* BACK */}

                <Link
                    to="/cart"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-emerald-500"
                >
                    <ArrowLeft size={17} />
                    Back to Cart
                </Link>

                {/* HEADER */}

                <div className="mb-10">
                    <h1 className="text-4xl font-black">
                        Checkout
                    </h1>

                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                        Enter your delivery details to place your order.
                    </p>
                </div>

                {/* ERROR */}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* ================= FORM ================= */}

                    <form
                        onSubmit={handlePlaceOrder}
                        className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <h2 className="text-2xl font-black">
                            Shipping Information
                        </h2>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">

                            {/* FULL NAME */}

                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-semibold">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800"
                                />
                            </div>

                            {/* PHONE */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    maxLength="10"
                                    required
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800"
                                />
                            </div>

                            {/* PINCODE */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Pincode
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="Enter pincode"
                                    maxLength="6"
                                    required
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800"
                                />
                            </div>

                            {/* ADDRESS */}

                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-semibold">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="House no, street, locality..."
                                    rows="4"
                                    required
                                    className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800"
                                />
                            </div>

                            {/* CITY */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    required
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800"
                                />
                            </div>

                            {/* STATE */}

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Enter state"
                                    required
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800"
                                />
                            </div>
                        </div>

                        {/* PAYMENT */}

                        <div className="mt-8">
                            <h3 className="text-lg font-bold">
                                Payment Method
                            </h3>

                            <div className="mt-4 rounded-xl border border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-500/10">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={
                                            formData.paymentMethod === "COD"
                                        }
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-emerald-500"
                                    />

                                    <div>
                                        <p className="font-bold">
                                            Cash on Delivery
                                        </p>

                                        <p className="text-sm text-zinc-500">
                                            Pay when your order arrives.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* PLACE ORDER */}

                        <Button
                            type="submit"
                            disabled={placingOrder}
                            className="mt-8 w-full rounded-full bg-emerald-500 py-6 font-bold text-black hover:bg-emerald-400 disabled:opacity-60"
                        >
                            {placingOrder ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="mr-2 animate-spin"
                                    />

                                    Placing Order...
                                </>
                            ) : (
                                "Place Order"
                            )}
                        </Button>
                    </form>

                    {/* ================= ORDER SUMMARY ================= */}

                    <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">

                        <h2 className="text-xl font-black">
                            Order Summary
                        </h2>

                        {/* ITEMS */}

                        <div className="mt-6 space-y-4">
                            {cart.items.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="h-14 w-14 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <p className="text-sm font-bold">
                                            {item.product.name}
                                        </p>

                                        <p className="text-xs text-zinc-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="text-sm font-bold">
                                        ₹
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="my-6 border-t border-zinc-200 dark:border-zinc-800" />

                        <div className="flex justify-between text-zinc-500">
                            <span>Items</span>

                            <span>
                                {cart.items.reduce(
                                    (total, item) =>
                                        total + item.quantity,
                                    0
                                )}
                            </span>
                        </div>

                        <div className="mt-4 flex justify-between text-xl font-black">
                            <span>Total</span>

                            <span>
                                ₹
                                {cart.totalAmount?.toLocaleString(
                                    "en-IN"
                                )}
                            </span>
                        </div>

                        <p className="mt-4 text-center text-xs text-zinc-400">
                            Secure checkout • Cash on Delivery
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;