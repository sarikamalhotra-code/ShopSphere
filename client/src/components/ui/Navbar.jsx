import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Moon,
    Sun,
    ShoppingBag,
    ShoppingCart,
    Package,
    LayoutDashboard,
    Users,
    LogOut,
} from "lucide-react";

import { Button } from "./button";
import { logoutUser } from "../../services/api";

const Navbar = () => {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    // =====================================================
    // CHECK LOGIN + ROLE
    // =====================================================

    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(
                !!localStorage.getItem("token")
            );

            setRole(
                localStorage.getItem("role")
            );
        };

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDarkMode(false);
        }

        checkLogin();

        window.addEventListener("storage", checkLogin);

        return () => {
            window.removeEventListener(
                "storage",
                checkLogin
            );
        };
    }, []);

    // =====================================================
    // THEME
    // =====================================================

    const toggleTheme = () => {
        const isDark =
            document.documentElement.classList.toggle(
                "dark"
            );

        setDarkMode(isDark);

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );
    };

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        logoutUser();

        setIsLoggedIn(false);
        setRole(null);

        navigate("/login");
    };

    // =====================================================
    // RETURN
    // =====================================================

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/80">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* =====================================================
                    LOGO
                ===================================================== */}

                <Link
                    to="/"
                    className="group flex items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
                        <ShoppingBag size={21} />
                    </div>

                    <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                        Shop
                        <span className="text-emerald-500">
                            Sphere
                        </span>
                    </span>
                </Link>

                {/* =====================================================
                    NAV LINKS
                ===================================================== */}

                <nav className="hidden items-center gap-8 md:flex">

                    {/* HOME */}

                    <Link
                        to="/"
                        className="text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                    >
                        Home
                    </Link>

                    {/* PRODUCTS */}

                    <Link
                        to="/products"
                        className="text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                    >
                        Products
                    </Link>

                    {/* =================================================
                        USER NAVIGATION
                    ================================================= */}

                    {isLoggedIn && role !== "admin" && (
                        <>
                            {/* CATEGORIES */}

                            <Link
                                to="/products"
                                className="text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                            >
                                Categories
                            </Link>

                            {/* MY ORDERS */}

                            <Link
                                to="/orders"
                                className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                            >
                                <Package size={17} />
                                My Orders
                            </Link>
                        </>
                    )}

                    {/* =================================================
                        ADMIN NAVIGATION
                    ================================================= */}

                    {isLoggedIn && role === "admin" && (
                        <>
                            {/* DASHBOARD */}

                            <Link
                                to="/admin"
                                className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                            >
                                <LayoutDashboard size={17} />
                                Dashboard
                            </Link>

                            {/* USERS */}

                            <Link
                                to="/admin/users"
                                className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                            >
                                <Users size={17} />
                                Users
                            </Link>

                            {/* ORDERS */}

                            <Link
                                to="/admin/orders"
                                className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-500 dark:text-zinc-300 dark:hover:text-emerald-400"
                            >
                                <Package size={17} />
                                Orders
                            </Link>
                        </>
                    )}
                </nav>

                {/* =====================================================
                    RIGHT SIDE
                ===================================================== */}

                <div className="flex items-center gap-2">

                    {/* =================================================
                        USER MY ORDERS - MOBILE
                    ================================================= */}

                    {isLoggedIn && role !== "admin" && (
                        <Link to="/orders">

                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 md:hidden"
                            >
                                <Package size={20} />
                            </Button>

                        </Link>
                    )}

                    {/* =================================================
                        USER CART
                    ================================================= */}

                    {isLoggedIn && role !== "admin" && (
                        <Link to="/cart">

                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                            >
                                <ShoppingCart size={20} />

                                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
                                    0
                                </span>
                            </Button>

                        </Link>
                    )}

                    {/* =================================================
                        THEME
                    ================================================= */}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                        {darkMode ? (
                            <Sun
                                size={20}
                                className="text-yellow-400"
                            />
                        ) : (
                            <Moon
                                size={20}
                                className="text-zinc-700"
                            />
                        )}
                    </Button>

                    {/* =================================================
                        LOGOUT
                    ================================================= */}

                    {isLoggedIn && (
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="hidden rounded-full sm:flex"
                        >
                            <LogOut
                                size={16}
                                className="mr-2"
                            />

                            Logout
                        </Button>
                    )}

                    {/* =================================================
                        LOGIN
                    ================================================= */}

                    {!isLoggedIn && (
                        <Link to="/login">

                            <Button className="hidden rounded-full bg-zinc-900 px-5 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 sm:flex">
                                Login
                            </Button>

                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;