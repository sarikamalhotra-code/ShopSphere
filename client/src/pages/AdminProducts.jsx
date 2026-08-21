import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Plus,
    Pencil,
    Trash2,
    Package,
    Search,
    X,
} from "lucide-react";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

import api from "../services/api";

const AdminProducts = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        gender: "",
        image: "",
        stock: "",
        brand: "",
    });

    // =====================================================
    // CHECK ADMIN + FETCH PRODUCTS
    // =====================================================

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "admin") {
            navigate("/login");
            return;
        }

        fetchProducts();
    }, [navigate]);

    // =====================================================
    // FETCH PRODUCTS
    // =====================================================

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await api.get("/products");

            setProducts(response.data);
        } catch (error) {
            console.error(
                "Error fetching products:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            gender: "",
            image: "",
            stock: "",
            brand: "",
        });

        setEditingProduct(null);
    };

    // =====================================================
    // OPEN ADD
    // =====================================================

    const openAddForm = () => {
        resetForm();
        setShowForm(true);
    };

    // =====================================================
    // OPEN EDIT
    // =====================================================

    const openEditForm = (product) => {
        setEditingProduct(product);

        setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            category: product.category || "",
            gender: product.gender || "Unisex",
            image: product.image || "",
            stock: product.stock || "",
            brand: product.brand || "",
        });

        setShowForm(true);
    };

    // =====================================================
    // CLOSE FORM
    // =====================================================

    const closeForm = () => {
        setShowForm(false);
        resetForm();
    };

    // =====================================================
    // ADD / UPDATE PRODUCT
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const data = {
            name: formData.name.trim(),

            description:
                formData.description.trim(),

            price: Number(formData.price),

            category: formData.category,

            gender: formData.gender,

            image: formData.image.trim(),

            stock: Number(formData.stock),

            brand: formData.brand.trim(),
        };

        try {
            if (editingProduct) {
                await api.put(
                    `/products/${editingProduct._id}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                alert(
                    "Product updated successfully!"
                );
            } else {
                await api.post(
                    "/products",
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                alert(
                    "Product added successfully!"
                );
            }

            closeForm();

            await fetchProducts();
        } catch (error) {
            console.error(
                "Product save error:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                alert(
                    "Admin authorization failed. Please login again."
                );

                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("user");

                navigate("/login");

                return;
            }

            alert(
                error.response?.data?.message ||
                    "Something went wrong"
            );
        }
    };

    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        const token = localStorage.getItem("token");

        try {
            await api.delete(
                `/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts((prev) =>
                prev.filter(
                    (product) =>
                        product._id !== id
                )
            );

            alert(
                "Product deleted successfully!"
            );
        } catch (error) {
            console.error(
                "Delete error:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Unable to delete product"
            );
        }
    };

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredProducts = products.filter(
        (product) => {
            const text =
                search.toLowerCase();

            return (
                product.name
                    ?.toLowerCase()
                    .includes(text) ||
                product.category
                    ?.toLowerCase()
                    .includes(text) ||
                product.gender
                    ?.toLowerCase()
                    .includes(text) ||
                product.brand
                    ?.toLowerCase()
                    .includes(text)
            );
        }
    );

    // =====================================================
    // UI
    // =====================================================

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#f8faf7] px-5 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-white sm:px-8">

            <div className="mx-auto max-w-7xl">

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">

                                <Package size={21} />

                            </div>

                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">

                                Inventory

                            </span>

                        </div>

                        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">

                            Product Management

                        </h1>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">

                            Manage your ShopSphere
                            inventory.

                        </p>

                    </div>


                    <Button
                        onClick={openAddForm}
                        className="rounded-full bg-emerald-600 px-5 text-white hover:bg-emerald-700"
                    >

                        <Plus
                            size={18}
                            className="mr-2"
                        />

                        Add Product

                    </Button>

                </div>


                {/* ================================================= */}
                {/* SEARCH */}
                {/* ================================================= */}

                <div className="mb-7 flex max-w-lg items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

                    <Search
                        size={19}
                        className="text-zinc-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search by product, brand, category..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
                    />

                </div>


                {/* ================================================= */}
                {/* LOADING */}
                {/* ================================================= */}

                {loading && (

                    <div className="py-20 text-center">

                        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-500 dark:border-zinc-800 dark:border-t-emerald-500" />

                        <p className="mt-4 text-sm text-zinc-500">

                            Loading products...

                        </p>

                    </div>

                )}


                {/* ================================================= */}
                {/* EMPTY */}
                {/* ================================================= */}

                {!loading &&
                    filteredProducts.length === 0 && (

                        <Card className="rounded-3xl border-zinc-200 bg-white p-14 text-center dark:border-zinc-800 dark:bg-zinc-900">

                            <Package
                                size={42}
                                className="mx-auto text-zinc-400"
                            />

                            <h2 className="mt-5 text-xl font-black">

                                No products found

                            </h2>

                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">

                                Add your first product
                                to ShopSphere.

                            </p>

                            <Button
                                onClick={openAddForm}
                                className="mt-6 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
                            >

                                <Plus
                                    size={17}
                                    className="mr-2"
                                />

                                Add Product

                            </Button>

                        </Card>

                    )}


                {/* ================================================= */}
                {/* PRODUCT GRID */}
                {/* ================================================= */}

                {!loading &&
                    filteredProducts.length > 0 && (

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {filteredProducts.map(
                                (product) => (

                                    <Card
                                        key={product._id}
                                        className="group overflow-hidden rounded-3xl border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                                    >

                                        {/* IMAGE */}

                                        <div className="relative h-56 overflow-hidden bg-zinc-100 dark:bg-zinc-800">

                                            {product.image ? (

                                                <img
                                                    src={
                                                        product.image
                                                    }
                                                    alt={
                                                        product.name
                                                    }
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                            ) : (

                                                <div className="flex h-full items-center justify-center">

                                                    <Package
                                                        size={50}
                                                        className="text-zinc-300 dark:text-zinc-600"
                                                    />

                                                </div>

                                            )}


                                            {/* STOCK BADGE */}

                                            <div className="absolute left-3 top-3">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-bold backdrop-blur ${
                                                        product.stock > 0
                                                            ? "bg-emerald-500/90 text-black"
                                                            : "bg-red-500/90 text-white"
                                                    }`}
                                                >

                                                    {product.stock >
                                                    0
                                                        ? `${product.stock} in stock`
                                                        : "Out of stock"}

                                                </span>

                                            </div>

                                        </div>


                                        {/* DETAILS */}

                                        <div className="p-5">

                                            <div className="flex items-center justify-between gap-2">

                                                <span className="text-xs font-black uppercase tracking-wider text-emerald-500">

                                                    {
                                                        product.category
                                                    }

                                                </span>


                                                <span className="text-xs font-medium text-zinc-400">

                                                    {
                                                        product.gender ||
                                                            "Unisex"
                                                    }

                                                </span>

                                            </div>


                                            <h2 className="mt-2 line-clamp-1 text-lg font-black">

                                                {
                                                    product.name
                                                }

                                            </h2>


                                            {product.brand && (

                                                <p className="mt-1 text-xs font-semibold text-zinc-500">

                                                    {
                                                        product.brand
                                                    }

                                                </p>

                                            )}


                                            <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-zinc-500 dark:text-zinc-400">

                                                {
                                                    product.description
                                                }

                                            </p>


                                            {/* PRICE */}

                                            <div className="mt-5 flex items-center justify-between">

                                                <span className="text-xl font-black">

                                                    ₹
                                                    {Number(
                                                        product.price
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </span>


                                                <span className="text-xs text-zinc-500">

                                                    Stock:{" "}

                                                    <strong className="text-zinc-900 dark:text-white">

                                                        {
                                                            product.stock
                                                        }

                                                    </strong>

                                                </span>

                                            </div>


                                            {/* ACTIONS */}

                                            <div className="mt-5 flex gap-2">

                                                <Button
                                                    onClick={() =>
                                                        openEditForm(
                                                            product
                                                        )
                                                    }
                                                    variant="outline"
                                                    className="flex-1 rounded-full border-zinc-200 dark:border-zinc-800"
                                                >

                                                    <Pencil
                                                        size={15}
                                                        className="mr-2"
                                                    />

                                                    Edit

                                                </Button>


                                                <Button
                                                    onClick={() =>
                                                        handleDelete(
                                                            product._id
                                                        )
                                                    }
                                                    variant="outline"
                                                    className="rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-950"
                                                >

                                                    <Trash2
                                                        size={16}
                                                    />

                                                </Button>

                                            </div>

                                        </div>

                                    </Card>

                                )
                            )}

                        </div>

                    )}

            </div>


            {/* ================================================= */}
            {/* ADD / EDIT MODAL */}
            {/* ================================================= */}

            {showForm && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">

                    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">

                        {/* MODAL HEADER */}

                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-5 dark:border-zinc-800 dark:bg-zinc-900">

                            <div>

                                <h2 className="text-xl font-black">

                                    {editingProduct
                                        ? "Edit Product"
                                        : "Add Product"}

                                </h2>

                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">

                                    {editingProduct
                                        ? "Update product details."
                                        : "Add a new product to your store."}

                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={closeForm}
                                className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6"
                        >

                            {/* NAME */}

                            <div>

                                <label className="mb-2 block text-sm font-bold">

                                    Product Name

                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Premium Watch"
                                    required
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-950"
                                />

                            </div>


                            {/* BRAND */}

                            <div>

                                <label className="mb-2 block text-sm font-bold">

                                    Brand

                                </label>

                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="Fossil"
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-950"
                                />

                            </div>


                            {/* CATEGORY + GENDER */}

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>

                                    <label className="mb-2 block text-sm font-bold">

                                        Category

                                    </label>

                                    <select
                                        name="category"
                                        value={
                                            formData.category
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
                                    >

                                        <option value="">
                                            Select category
                                        </option>

                                        <option value="Watches">
                                            Watches
                                        </option>

                                        <option value="Tops">
                                            Tops
                                        </option>

                                        <option value="Jeans">
                                            Jeans
                                        </option>

                                        <option value="Dresses">
                                            Dresses
                                        </option>

                                        <option value="Shirts">
                                            Shirts
                                        </option>

                                        <option value="Bags">
                                            Bags
                                        </option>

                                        <option value="Shoes">
                                            Shoes
                                        </option>

                                        <option value="Electronics">
                                            Electronics
                                        </option>

                                        <option value="Accessories">
                                            Accessories
                                        </option>

                                    </select>

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-bold">

                                        Gender

                                    </label>

                                    <select
                                        name="gender"
                                        value={
                                            formData.gender
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
                                    >

                                        <option value="">
                                            Select gender
                                        </option>

                                        <option value="Men">
                                            Men
                                        </option>

                                        <option value="Women">
                                            Women
                                        </option>

                                        <option value="Unisex">
                                            Unisex
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* PRICE + STOCK */}

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>

                                    <label className="mb-2 block text-sm font-bold">

                                        Price

                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={
                                            formData.price
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="2999"
                                        min="0"
                                        required
                                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-bold">

                                        Stock

                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        value={
                                            formData.stock
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="20"
                                        min="0"
                                        required
                                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
                                    />

                                </div>

                            </div>


                            {/* DESCRIPTION */}

                            <div>

                                <label className="mb-2 block text-sm font-bold">

                                    Description

                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Describe the product..."
                                    rows="4"
                                    required
                                    className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
                                />

                            </div>


                            {/* IMAGE */}

                            <div>

                                <label className="mb-2 block text-sm font-bold">

                                    Image URL

                                </label>

                                <input
                                    type="url"
                                    name="image"
                                    value={
                                        formData.image
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="https://..."
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
                                />

                            </div>


                            {/* IMAGE PREVIEW */}

                            {formData.image && (

                                <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">

                                    <img
                                        src={
                                            formData.image
                                        }
                                        alt="Product preview"
                                        className="h-52 w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                    />

                                </div>

                            )}


                            {/* BUTTONS */}

                            <div className="flex justify-end gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={closeForm}
                                    className="rounded-full border-zinc-200 dark:border-zinc-800"
                                >

                                    Cancel

                                </Button>


                                <Button
                                    type="submit"
                                    className="rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700"
                                >

                                    {editingProduct
                                        ? "Update Product"
                                        : "Add Product"}

                                </Button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </main>
    );
};

export default AdminProducts;