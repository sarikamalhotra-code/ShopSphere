import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import api from "../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", form);
            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("user", JSON.stringify(data.user));

            gsap.to(".auth-card", {
                opacity: 0,
                y: -20,
                duration: 0.35,
                onComplete: () => {
                    if (data.user.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/products");
                    }
                },
            });

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Invalid email or password."
            );

            setLoading(false);
        }
    };

    return (
        <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[#f8faf7] px-6 py-16 text-zinc-900 dark:bg-zinc-950 dark:text-white">

            {/* GREEN GLOW */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/15" />

            <div className="pointer-events-none absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-emerald-400/10 blur-[70px]" />

            <div className="pointer-events-none absolute bottom-[10%] right-[12%] h-40 w-40 rounded-full bg-emerald-500/10 blur-[80px]" />

            {/* CARD */}

            <Card className="auth-card relative z-10 w-full max-w-md rounded-[2rem] border border-zinc-200/70 bg-white/85 p-8 shadow-2xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-900/85">

                {/* HEADER */}

                <div className="mb-8 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-xl shadow-emerald-500/30">
                        <LogIn size={28} />
                    </div>

                    <h1 className="mt-6 text-3xl font-black">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        Login and continue shopping smarter.
                    </p>

                </div>

                {/* ERROR */}

                {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* EMAIL */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">
                            Email
                        </label>

                        <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800/70">

                            <Mail
                                size={18}
                                className="text-zinc-400"
                            />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-zinc-400"
                            />

                        </div>

                    </div>

                    {/* PASSWORD */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold">
                            Password
                        </label>

                        <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800/70">

                            <Lock
                                size={18}
                                className="text-zinc-400"
                            />

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-zinc-400"
                            />

                        </div>

                    </div>

                    {/* BUTTON */}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="group h-12 w-full rounded-xl bg-emerald-500 font-bold text-black shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30"
                    >

                        {loading ? "Logging in..." : "Login"}

                        {!loading && (
                            <ArrowRight
                                size={18}
                                className="ml-2 transition-transform group-hover:translate-x-1"
                            />
                        )}

                    </Button>

                </form>

                <p className="mt-7 text-center text-sm text-zinc-500 dark:text-zinc-400">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
                    >
                        Create Account
                    </Link>

                </p>

            </Card>

        </main>
    );
};

export default Login;