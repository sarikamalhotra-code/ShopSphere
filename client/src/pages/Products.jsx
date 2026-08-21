import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingCart, Star, Search, Loader2, PackageOpen, } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { getProducts, addToCart } from "../services/api";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState(null);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    // ================= FETCH PRODUCTS =================
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProducts();

                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching products:", error);

                setError(
                    error?.response?.data?.message ||
                        "Unable to load products."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ================= SEARCH + CATEGORY FILTER =================
    const filteredProducts = products.filter((product) => {
        const productName = product?.name?.toLowerCase() || "";
        const productCategory = product?.category?.toLowerCase() || "";

        const matchesSearch = productName.includes(
            search.toLowerCase()
        );

        const matchesCategory =
            !category ||
            productCategory === category.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    // ================= ADD TO CART =================
    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first.");
                return;
            }

            setAddingId(productId);

            const data = await addToCart(productId, 1);

            console.log("Added to cart:", data);

            // Notify Navbar that cart has changed
            window.dispatchEvent(new Event("cartUpdated"));

            alert("Product added to cart 🛒");
        } catch (error) {
            console.error("Add to cart error:", error);

            if (error?.response?.status === 401) {
                alert("Please login first.");
            } else {
                alert(
                    error?.response?.data?.message ||
                        "Unable to add product to cart."
                );
            }
        } finally {
            setAddingId(null);
        }
    };

    // ================= UI =================
    return (
        <main className="min-h-screen bg-[#f7faf9] px-6 py-12 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
                        ShopSmarter
                    </p>

                    <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                        Discover Products
                    </h1>

                    <p className="mt-3 max-w-xl text-zinc-500 dark:text-zinc-400">
                        Explore our collection and find products
                        you'll love.
                    </p>
                </div>

                {/* SEARCH */}
                <div className="mb-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all focus-within:border-emerald-500 focus-within:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                    <Search
                        size={20}
                        className="shrink-0 text-zinc-400"
                    />

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="text-xs font-medium text-zinc-400 hover:text-emerald-500"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* CATEGORY */}
                {category && (
                    <div className="mb-8 flex items-center gap-3">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            Category:
                        </span>

                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            {category}
                        </span>
                    </div>
                )}

                {/* ERROR */}
                {error && !loading && (
                    <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        <p className="font-semibold">{error}</p>

                        <p className="mt-1 text-sm opacity-80">
                            Make sure your backend server is running.
                        </p>
                    </div>
                )}

                {/* LOADING */}
                {loading && (
                    <div className="flex min-h-[300px] flex-col items-center justify-center">
                        <Loader2
                            size={38}
                            className="animate-spin text-emerald-500"
                        />

                        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Loading products...
                        </p>
                    </div>
                )}

                {/* EMPTY */}
                {!loading &&
                    !error &&
                    filteredProducts.length === 0 && (
                        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                                <PackageOpen
                                    size={30}
                                    className="text-zinc-400"
                                />
                            </div>

                            <h2 className="mt-5 text-xl font-bold">
                                No products found
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                Try searching for something else.
                            </p>
                        </div>
                    )}

                {/* PRODUCTS */}
                {!loading &&
                    !error &&
                    filteredProducts.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product) => (
                                <Card
                                    key={product._id}
                                    className="group overflow-hidden rounded-3xl border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500/30"
                                >
                                    {/* IMAGE */}
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="block"
                                    >
                                        <div className="relative flex h-60 items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <span className="text-7xl">
                                                    🛍️
                                                </span>
                                            )}

                                            {/* STOCK */}
                                            {product.stock <= 0 ? (
                                                <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                                                    Out of Stock
                                                </span>
                                            ) : (
                                                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur dark:bg-zinc-900/90 dark:text-emerald-400">
                                                    In Stock
                                                </span>
                                            )}
                                        </div>
                                    </Link>

                                    {/* DETAILS */}
                                    <div className="p-5">

                                        {/* CATEGORY */}
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                            {product.category}
                                        </p>

                                        {/* NAME */}
                                        <Link
                                            to={`/products/${product._id}`}
                                        >
                                            <h2 className="mt-2 line-clamp-1 text-lg font-bold transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                                                {product.name}
                                            </h2>
                                        </Link>

                                        {/* DESCRIPTION */}
                                        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-zinc-500 dark:text-zinc-400">
                                            {product.description}
                                        </p>

                                        {/* RATING */}
                                        <div className="mt-4 flex items-center gap-1 text-sm text-orange-500">
                                            <Star
                                                size={15}
                                                fill="currentColor"
                                            />

                                            <span className="font-semibold">
                                                4.8
                                            </span>

                                            <span className="ml-1 text-zinc-400">
                                                (120)
                                            </span>
                                        </div>

                                        {/* PRICE + BUTTON */}
                                        <div className="mt-5 flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-xl font-black">
                                                    ₹
                                                    {product.price?.toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>
                                            </div>

                                            <Button
                                                disabled={
                                                    product.stock <= 0 ||
                                                    addingId === product._id
                                                }
                                                onClick={() =>
                                                    handleAddToCart(
                                                        product._id
                                                    )
                                                }
                                                className="rounded-full bg-emerald-600 px-4 text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400"
                                            >
                                                {addingId ===
                                                product._id ? (
                                                    <>
                                                        <Loader2
                                                            size={17}
                                                            className="mr-2 animate-spin"
                                                        />
                                                        Adding...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShoppingCart
                                                            size={17}
                                                            className="mr-2"
                                                        />
                                                        Add
                                                    </>
                                                )}
                                            </Button>
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

export default Products;