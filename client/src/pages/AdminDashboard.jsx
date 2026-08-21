import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Package,
    Users,
    ShoppingCart,
    IndianRupee,
    TrendingUp,
    ArrowUpRight,
    ArrowRight,
    LogOut,
    ShieldCheck,
    MoreHorizontal,
} from "lucide-react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

import {
    getAdminStats,
    getRecentOrders,
} from "../services/api";

// =====================================================
// TEMPORARY CHART DATA
// =====================================================

const revenueData = [
    { day: "Mon", revenue: 4200 },
    { day: "Tue", revenue: 6800 },
    { day: "Wed", revenue: 5400 },
    { day: "Thu", revenue: 9100 },
    { day: "Fri", revenue: 7800 },
    { day: "Sat", revenue: 11200 },
    { day: "Sun", revenue: 9800 },
];

const ordersChartData = [
    { day: "Mon", orders: 12 },
    { day: "Tue", orders: 19 },
    { day: "Wed", orders: 15 },
    { day: "Thu", orders: 27 },
    { day: "Fri", orders: 23 },
    { day: "Sat", orders: 34 },
    { day: "Sun", orders: 29 },
];

const categoryData = [
    {
        name: "Electronics",
        value: 35,
    },
    {
        name: "Fashion",
        value: 28,
    },
    {
        name: "Watches",
        value: 20,
    },
    {
        name: "Accessories",
        value: 17,
    },
];

const COLORS = [
    "#10b981",
    "#34d399",
    "#059669",
    "#6ee7b7",
];

// =====================================================
// ADMIN DASHBOARD
// =====================================================

const AdminDashboard = () => {
    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [user, setUser] = useState(null);

    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0,
    });

    const [recentOrders, setRecentOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    // =====================================================
    // LOAD ADMIN DATA
    // =====================================================

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const savedUser = localStorage.getItem("user");

        // =================================================
        // ADMIN PROTECTION
        // =================================================

        if (!token || role !== "admin") {
            navigate("/login");
            return;
        }

        // =================================================
        // LOAD USER
        // =================================================

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error(
                    "Error parsing user:",
                    error
                );
            }
        }

        // =================================================
        // FETCH DASHBOARD DATA
        // =================================================

        const fetchAdminData = async () => {
            try {
                setLoading(true);

                // -----------------------------------------
                // FETCH STATS
                // -----------------------------------------

                const statsData = await getAdminStats();

                setStats({
                    users: statsData?.users || 0,
                    products: statsData?.products || 0,
                    orders: statsData?.orders || 0,
                    revenue: statsData?.revenue || 0,
                });

                // -----------------------------------------
                // FETCH RECENT ORDERS
                // -----------------------------------------

                try {
                    const ordersData =
                        await getRecentOrders();

                    console.log(
                        "Recent orders:",
                        ordersData
                    );

                    setRecentOrders(
                        Array.isArray(ordersData)
                            ? ordersData
                            : []
                    );
                } catch (orderError) {
                    console.error(
                        "Error fetching recent orders:",
                        orderError
                    );

                    setRecentOrders([]);
                }
            } catch (error) {
                console.error(
                    "Error fetching admin data:",
                    error
                );

                // -----------------------------------------
                // AUTH ERROR
                // -----------------------------------------

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

        fetchAdminData();
    }, [navigate]);

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        navigate("/login");
    };

    // =====================================================
    // STATUS STYLE
    // IMPORTANT:
    // Backend field = orderStatus
    // =====================================================

    const getOrderStatusStyle = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

            case "Shipped":
                return "bg-purple-500/10 text-purple-600 dark:text-purple-400";

            case "Processing":
                return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

            case "Cancelled":
                return "bg-red-500/10 text-red-600 dark:text-red-400";

            case "Placed":
                return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";

            default:
                return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400";
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f8faf7] dark:bg-zinc-950">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-500 dark:border-zinc-800 dark:border-t-emerald-500" />

                    <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                        Loading dashboard...
                    </p>
                </div>
            </main>
        );
    }

    // =====================================================
    // DASHBOARD
    // =====================================================

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#f8faf7] px-5 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-white sm:px-8">
            <div className="mx-auto max-w-7xl">

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
                                <ShieldCheck size={19} />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-500">
                                Admin Dashboard
                            </span>
                        </div>

                        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Good morning
                            {user?.name
                                ? `, ${user.name}`
                                : ""}
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Here's what's happening with your store today.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium dark:border-zinc-800 dark:bg-zinc-900 sm:block">
                            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                            Store Online
                        </div>

                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="rounded-full border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <LogOut
                                size={16}
                                className="mr-2"
                            />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* ================================================= */}
                {/* STATS */}
                {/* ================================================= */}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* REVENUE */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                <IndianRupee size={21} />
                            </div>

                            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                <ArrowUpRight size={13} />
                                Live
                            </span>
                        </div>

                        <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
                            Total Revenue
                        </p>

                        <h2 className="mt-1 text-2xl font-black">
                            ₹
                            {Number(
                                stats.revenue || 0
                            ).toLocaleString("en-IN")}
                        </h2>
                    </Card>

                    {/* ORDERS */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                <ShoppingCart size={21} />
                            </div>

                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                Live
                            </span>
                        </div>

                        <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
                            Total Orders
                        </p>

                        <h2 className="mt-1 text-2xl font-black">
                            {stats.orders}
                        </h2>
                    </Card>

                    {/* PRODUCTS */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                <Package size={21} />
                            </div>

                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                Live
                            </span>
                        </div>

                        <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
                            Total Products
                        </p>

                        <h2 className="mt-1 text-2xl font-black">
                            {stats.products}
                        </h2>
                    </Card>

                    {/* USERS */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-5 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                <Users size={21} />
                            </div>

                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                Live
                            </span>
                        </div>

                        <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
                            Customers
                        </p>

                        <h2 className="mt-1 text-2xl font-black">
                            {stats.users}
                        </h2>
                    </Card>
                </div>

                {/* ================================================= */}
                {/* CHARTS */}
                {/* ================================================= */}

                <div className="mt-6 grid gap-6 xl:grid-cols-3">

                    {/* REVENUE CHART */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900 xl:col-span-2">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">
                                    Analytics
                                </p>

                                <h2 className="mt-1 text-xl font-black">
                                    Revenue Overview
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                    Weekly revenue performance
                                </p>
                            </div>

                            <button className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className="h-[300px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <LineChart data={revenueData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        className="text-zinc-200 dark:text-zinc-800"
                                    />

                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) =>
                                            `₹${value / 1000}k`
                                        }
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "14px",
                                            border: "1px solid #27272a",
                                            backgroundColor: "#18181b",
                                            color: "#fff",
                                        }}
                                        formatter={(value) => [
                                            `₹${Number(
                                                value
                                            ).toLocaleString(
                                                "en-IN"
                                            )}`,
                                            "Revenue",
                                        ]}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={{
                                            r: 4,
                                            fill: "#10b981",
                                        }}
                                        activeDot={{
                                            r: 7,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* CATEGORY PIE */}

                    <Card className="rounded-3xl border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">
                                Sales
                            </p>

                            <h2 className="mt-1 text-xl font-black">
                                Category Share
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Sales by category
                            </p>
                        </div>

                        <div className="mt-3 h-[230px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={58}
                                        outerRadius={88}
                                        paddingAngle={4}
                                    >
                                        {categoryData.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}
                                    </Pie>

                                    <Tooltip
                                        formatter={(value) => [
                                            `${value}%`,
                                            "Sales",
                                        ]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {categoryData.map(
                                (category, index) => (
                                    <div
                                        key={category.name}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="h-2.5 w-2.5 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        COLORS[
                                                            index
                                                        ],
                                                }}
                                            />

                                            <span className="text-zinc-600 dark:text-zinc-300">
                                                {category.name}
                                            </span>
                                        </div>

                                        <span className="font-bold">
                                            {category.value}%
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </Card>
                </div>

                {/* ================================================= */}
                {/* ORDERS BAR CHART */}
                {/* ================================================= */}

                <Card className="mt-6 rounded-3xl border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">
                                Orders
                            </p>

                            <h2 className="mt-1 text-xl font-black">
                                Order Activity
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Orders received this week
                            </p>
                        </div>

                        <TrendingUp
                            size={22}
                            className="text-emerald-500"
                        />
                    </div>

                    <div className="h-[280px]">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <BarChart data={ordersChartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    className="text-zinc-200 dark:text-zinc-800"
                                />

                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />

                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "14px",
                                        border: "1px solid #27272a",
                                        backgroundColor: "#18181b",
                                        color: "#fff",
                                    }}
                                />

                                <Bar
                                    dataKey="orders"
                                    fill="#10b981"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* ================================================= */}
                {/* RECENT ORDERS */}
                {/* ================================================= */}

                <Card className="mt-6 overflow-hidden rounded-3xl border-zinc-200/70 bg-white shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900">

                    <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">
                                Activity
                            </p>

                            <h2 className="mt-1 text-xl font-black">
                                Recent Orders
                            </h2>
                        </div>

                        <Link to="/admin/orders">
                            <Button
                                variant="outline"
                                className="rounded-full border-zinc-200 dark:border-zinc-800"
                            >
                                View All

                                <ArrowRight
                                    size={16}
                                    className="ml-2"
                                />
                            </Button>
                        </Link>
                    </div>

                    {recentOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                <ShoppingCart size={24} />
                            </div>

                            <h3 className="mt-4 font-bold">
                                No recent orders
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                New customer orders will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">

                                <thead>
                                    <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wider text-zinc-400 dark:border-zinc-800">

                                        <th className="px-6 py-4">
                                            Order
                                        </th>

                                        <th className="px-6 py-4">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4">
                                            Status
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {recentOrders.map(
                                        (order) => {

                                            // =================================================
                                            // IMPORTANT FIX
                                            // Backend field is orderStatus
                                            // NOT status
                                            // =================================================

                                            const status =
                                                order.orderStatus ||
                                                "Placed";

                                            return (
                                                <tr
                                                    key={
                                                        order._id
                                                    }
                                                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/70"
                                                >

                                                    {/* ORDER ID */}

                                                    <td className="px-6 py-5 text-sm font-bold">
                                                        #
                                                        {order._id
                                                            ? order._id.slice(
                                                                  -6
                                                              )
                                                            : "N/A"}
                                                    </td>

                                                    {/* CUSTOMER */}

                                                    <td className="px-6 py-5 text-sm">
                                                        {order
                                                            .user
                                                            ?.name ||
                                                            order
                                                                .user
                                                                ?.email ||
                                                            "Customer"}
                                                    </td>

                                                    {/* AMOUNT */}

                                                    <td className="px-6 py-5 text-sm font-bold">
                                                        ₹
                                                        {Number(
                                                            order.totalAmount ||
                                                                0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-bold ${getOrderStatusStyle(
                                                                status
                                                            )}`}
                                                        >
                                                            {status}
                                                        </span>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>

                            </table>
                        </div>
                    )}
                </Card>

                {/* ================================================= */}
                {/* QUICK MANAGEMENT */}
                {/* ================================================= */}

                <div className="mt-6 grid gap-4 sm:grid-cols-3">

                    {/* PRODUCTS */}

                    <Link to="/admin/products">
                        <Card className="group rounded-3xl border-zinc-200/70 bg-white p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg dark:border-zinc-800/70 dark:bg-zinc-900">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black">
                                    <Package size={20} />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500"
                                />

                            </div>

                            <h3 className="mt-5 font-bold">
                                Manage Products
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Add and edit products
                            </p>

                        </Card>
                    </Link>

                    {/* USERS */}

                    <Link to="/admin/users">
                        <Card className="group rounded-3xl border-zinc-200/70 bg-white p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg dark:border-zinc-800/70 dark:bg-zinc-900">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black">
                                    <Users size={20} />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500"
                                />

                            </div>

                            <h3 className="mt-5 font-bold">
                                Manage Users
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                View registered customers
                            </p>

                        </Card>
                    </Link>

                    {/* ORDERS */}

                    <Link to="/admin/orders">
                        <Card className="group rounded-3xl border-zinc-200/70 bg-white p-5 transition-all hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg dark:border-zinc-800/70 dark:bg-zinc-900">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black">
                                    <ShoppingCart size={20} />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500"
                                />

                            </div>

                            <h3 className="mt-5 font-bold">
                                Manage Orders
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Track customer orders
                            </p>

                        </Card>
                    </Link>

                </div>

            </div>
        </main>
    );
};

export default AdminDashboard;