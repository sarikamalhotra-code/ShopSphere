import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    Search,
    Trash2,
    ShieldCheck,
    UserRound,
} from "lucide-react";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

import api from "../services/api";

const AdminUsers = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // ================= FETCH USERS =================

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await api.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    // ================= ADMIN CHECK =================

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "admin") {
            navigate("/login");
            return;
        }

        fetchUsers();
    }, [navigate]);

    // ================= DELETE =================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers((prev) =>
                prev.filter((user) => user._id !== id)
            );

            alert("User deleted successfully!");
        } catch (error) {
            console.error("Delete user error:", error);

            alert(
                error.response?.data?.message ||
                    "Unable to delete user"
            );
        }
    };

    // ================= SEARCH =================

    const filteredUsers = users.filter((user) => {
        const text = search.toLowerCase();

        return (
            user.name?.toLowerCase().includes(text) ||
            user.email?.toLowerCase().includes(text) ||
            user.role?.toLowerCase().includes(text)
        );
    });

    // ================= UI =================

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#f8faf7] px-5 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-white sm:px-8">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
                                <Users size={21} />
                            </div>

                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                                Customers
                            </span>

                        </div>

                        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            User Management
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Manage ShopSphere customers and administrators.
                        </p>

                    </div>

                    <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {users.length} Total Users
                    </div>

                </div>

                {/* SEARCH */}

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
                        placeholder="Search users..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
                    />

                </div>

                {/* LOADING */}

                {loading ? (

                    <div className="py-20 text-center">

                        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-500 dark:border-zinc-800 dark:border-t-emerald-500" />

                        <p className="mt-4 text-sm text-zinc-500">
                            Loading users...
                        </p>

                    </div>

                ) : (

                    <Card className="overflow-hidden rounded-3xl border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[700px]">

                                <thead>

                                    <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wider text-zinc-400 dark:border-zinc-800">

                                        <th className="px-6 py-4">
                                            User
                                        </th>

                                        <th className="px-6 py-4">
                                            Email
                                        </th>

                                        <th className="px-6 py-4">
                                            Role
                                        </th>

                                        <th className="px-6 py-4">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredUsers.map((user) => (

                                        <tr
                                            key={user._id}
                                            className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/70"
                                        >

                                            {/* USER */}

                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                                                        <UserRound size={20} />
                                                    </div>

                                                    <div>

                                                        <p className="font-bold">
                                                            {user.name || "Unknown User"}
                                                        </p>

                                                        <p className="text-xs text-zinc-400">
                                                            #{user._id?.slice(-6)}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* EMAIL */}

                                            <td className="px-6 py-5 text-sm text-zinc-600 dark:text-zinc-300">
                                                {user.email}
                                            </td>

                                            {/* ROLE */}

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                                                        user.role === "admin"
                                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                                                    }`}
                                                >

                                                    {user.role === "admin" && (
                                                        <ShieldCheck size={13} />
                                                    )}

                                                    {user.role || "user"}

                                                </span>

                                            </td>

                                            {/* DELETE */}

                                            <td className="px-6 py-5">

                                                {user.role !== "admin" ? (

                                                    <Button
                                                        onClick={() =>
                                                            handleDelete(user._id)
                                                        }
                                                        variant="outline"
                                                        className="rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-950"
                                                    >

                                                        <Trash2
                                                            size={16}
                                                            className="mr-2"
                                                        />

                                                        Delete

                                                    </Button>

                                                ) : (

                                                    <span className="text-xs font-semibold text-zinc-400">
                                                        Protected
                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                        {filteredUsers.length === 0 && (

                            <div className="px-6 py-16 text-center">

                                <Users
                                    size={42}
                                    className="mx-auto text-zinc-400"
                                />

                                <h2 className="mt-4 font-black">
                                    No users found
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Try another search.
                                </p>

                            </div>

                        )}

                    </Card>

                )}

            </div>

        </main>
    );
};

export default AdminUsers;