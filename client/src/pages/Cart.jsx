import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
    getCart,
    updateCartItem,
    removeFromCart,
} from "../services/api";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================= LOAD CART =================
    const loadCart = async () => {
        try {
            setLoading(true);

            const data = await getCart();

            console.log("Cart data:", data);

            setCart(data);
        } catch (error) {
            console.error("Error loading cart:", error);
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    // ================= UPDATE QUANTITY =================
    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;

        try {
            await updateCartItem(productId, quantity);

            await loadCart();

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    // ================= REMOVE ITEM =================
    const removeItem = async (productId) => {
        try {
            await removeFromCart(productId);

            await loadCart();

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <p className="text-zinc-500">
                    Loading cart...
                </p>
            </div>
        );
    }

    // ================= EMPTY CART =================
    if (!cart || !cart.items || cart.items.length === 0) {
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
                    Add some products to your cart.
                </p>

                <Link
                    to="/products"
                    className="mt-6"
                >
                    <Button className="rounded-full bg-emerald-500 px-6 text-black hover:bg-emerald-400">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    // ================= CALCULATE TOTAL =================
    const totalAmount = cart.items.reduce(
        (total, item) => {
            const price = Number(item?.price ?? item?.product?.price ?? 0);
            const quantity = Number(item?.quantity ?? 0);

            return total + price * quantity;
        },
        0
    );

    return (
        <main className="min-h-screen bg-[#f8faf7] px-6 py-12 dark:bg-zinc-950">
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}
                <h1 className="text-4xl font-black text-zinc-900 dark:text-white">
                    Shopping Cart
                </h1>

                <p className="mt-2 text-zinc-500">
                    Review your items before checkout.
                </p>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]">

                    {/* ================= ITEMS ================= */}
                    <div className="space-y-4">

                        {cart.items.map((item) => {
                            const product = item.product;

                            if (!product) return null;

                            const price = Number(
                                item.price ?? product.price ?? 0
                            );

                            return (
                                <div
                                    key={item._id}
                                    className="flex gap-5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                                >

                                    {/* IMAGE */}
                                    <img
                                        src={
                                            product.image ||
                                            "https://via.placeholder.com/150"
                                        }
                                        alt={product.name || "Product"}
                                        className="h-28 w-28 rounded-xl object-cover"
                                    />

                                    {/* CONTENT */}
                                    <div className="flex flex-1 flex-col justify-between">

                                        {/* PRODUCT INFO */}
                                        <div>
                                            <h2 className="font-bold text-zinc-900 dark:text-white">
                                                {product.name}
                                            </h2>

                                            <p className="mt-1 text-sm text-zinc-500">
                                                ₹
                                                {price.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </p>
                                        </div>

                                        {/* BOTTOM */}
                                        <div className="flex items-center justify-between">

                                            {/* QUANTITY */}
                                            <div className="flex items-center gap-2 rounded-full border border-zinc-200 px-2 py-1 dark:border-zinc-700">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            product._id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                    className="rounded-full p-1 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-zinc-800"
                                                >
                                                    <Minus size={15} />
                                                </button>

                                                <span className="w-6 text-center text-sm font-bold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            product._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                                >
                                                    <Plus size={15} />
                                                </button>

                                            </div>

                                            {/* DELETE */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(product._id)
                                                }
                                                className="text-red-500 transition hover:text-red-600"
                                            >
                                                <Trash2 size={19} />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ================= SUMMARY ================= */}
                    <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">

                        <h2 className="text-xl font-black">
                            Order Summary
                        </h2>

                        <div className="mt-6 flex justify-between text-zinc-500">
                            <span>Items</span>

                            <span>
                                {cart.items.reduce(
                                    (total, item) =>
                                        total + Number(item.quantity || 0),
                                    0
                                )}
                            </span>
                        </div>

                        <div className="my-4 border-t border-zinc-200 dark:border-zinc-800" />

                        <div className="flex justify-between text-xl font-black">
                            <span>Total</span>

                            <span>
                                ₹
                                {totalAmount.toLocaleString(
                                    "en-IN"
                                )}
                            </span>
                        </div>

                        <Link to="/checkout">
                            <Button className="mt-6 w-full rounded-full bg-emerald-500 py-6 font-bold text-black hover:bg-emerald-400">
                                Proceed to Checkout
                            </Button>
                        </Link>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;