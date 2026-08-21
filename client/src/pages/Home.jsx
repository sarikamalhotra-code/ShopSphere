import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, Sparkles, ShoppingBag, Star, ShieldCheck, Truck, Zap, Heart, } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const Home = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);
    const visualRef = useRef(null);
    const glowRef = useRef(null);

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            titleRef.current,
            {
                y: 60,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
            }
        )
            .fromTo(
                subtitleRef.current,
                {
                    y: 25,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out",
                },
                "-=0.5"
            )
            .fromTo(
                buttonsRef.current,
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out",
                },
                "-=0.4"
            )
            .fromTo(
                visualRef.current,
                {
                    x: 70,
                    opacity: 0,
                    scale: 0.9,
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.7"
            );

        gsap.to(glowRef.current, {
            scale: 1.15,
            x: 30,
            y: -20,
            opacity: 0.7,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(".floating-card-one", {
            y: -12,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(".floating-card-two", {
            y: 12,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        return () => {
            tl.kill();
        };
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage("Please enter your email.");
            return;
        }

        setMessage("You're subscribed! 🎉");
        setEmail("");
    };

    return (
        <main className="overflow-hidden bg-[#f8faf7] text-zinc-900 dark:bg-zinc-950 dark:text-white">
            <section className="relative min-h-[calc(100vh-5rem)]">

                <div ref={glowRef} className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-emerald-300/30 blur-[120px] dark:bg-emerald-500/10"/>
                <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-[120px] dark:bg-orange-500/10" />
                <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

                    {/* LEFT */}

                    <div>

                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-zinc-900 dark:text-emerald-400">
                            <Sparkles size={16} />
                            Your smarter way to shop
                        </div>

                        <h1 ref={titleRef} className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                            Shop smarter.
                            <br />

                            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-300 dark:to-orange-400">
                                Live better.
                            </span>
                        </h1>

                        <p ref={subtitleRef} className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                            Discover products you'll love, compare what
                            matters, and find everything you need in one
                            beautiful shopping experience.
                        </p>

                        <div ref={buttonsRef} className="mt-9 flex flex-wrap gap-4">

                            <Link to="/products">
                                <Button size="lg" className="group h-12 rounded-full bg-emerald-600 px-7 text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400">
                                    Shop Now
                                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1"/>
                                </Button>
                            </Link>

                            <Link to="/products">

                                <Button size="lg" variant="outline" className="h-12 rounded-full border-zinc-300 bg-white px-7 text-zinc-800 hover:bg-orange-50 hover:text-orange-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-orange-500/10 dark:hover:text-orange-400">
                                    <ShoppingBag size={18} className="mr-2"/>
                                    Explore Collection
                                </Button>

                            </Link>

                        </div>

                        <div className="mt-12 flex flex-wrap gap-7 text-sm text-zinc-600 dark:text-zinc-400">

                            <div className="flex items-center gap-2">
                                <ShieldCheck size={19} className="text-emerald-500"/>
                                Secure Payment
                            </div>

                            <div className="flex items-center gap-2">
                                <Truck size={19} className="text-emerald-500"/>
                                Fast Delivery
                            </div>

                            <div className="flex items-center gap-2">
                                <Zap size={19} className="text-orange-500"/>
                                Easy Shopping
                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div ref={visualRef} className="relative flex justify-center lg:justify-end">
                        <div className="relative flex h-[390px] w-[390px] items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 via-white to-orange-100 shadow-2xl dark:from-emerald-950 dark:via-zinc-900 dark:to-orange-950 sm:h-[500px] sm:w-[500px]">
                            <div className="absolute inset-10 rounded-full border border-emerald-300/40 dark:border-emerald-500/20" />
                            <div className="relative flex h-[290px] w-[290px] items-center justify-center rounded-full bg-white shadow-inner dark:bg-zinc-900 sm:h-[380px] sm:w-[380px]">
                                <div className="text-center">
                                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-emerald-100 shadow-lg dark:bg-emerald-500/10">
                                        <ShoppingBag size={65} strokeWidth={1.2} className="text-emerald-600 dark:text-emerald-400"/>
                                    </div>

                                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.4em] text-zinc-400">
                                        ShopSphere
                                    </p>

                                    <p className="mt-2 text-sm text-zinc-500">
                                        Everything you need
                                    </p>

                                </div>

                            </div>

                            <Card className="floating-card-one absolute -left-6 top-16 w-56 rounded-2xl border-zinc-100 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl dark:bg-orange-500/10">
                                        🛍️
                                    </div>

                                    <div>

                                        <p className="text-sm font-bold">
                                            Trending Now
                                        </p>

                                        <p className="text-xs text-zinc-500">
                                            New arrivals
                                        </p>

                                    </div>

                                </div>

                            </Card>

                            <Card className="floating-card-two absolute -bottom-5 -right-5 rounded-2xl border-zinc-100 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">

                                        <Star
                                            size={19}
                                            fill="currentColor"
                                            className="text-emerald-500"
                                        />

                                    </div>

                                    <div>

                                        <p className="font-bold">
                                            4.9/5
                                        </p>

                                        <p className="text-xs text-zinc-500">
                                            50K+ happy shoppers
                                        </p>

                                    </div>

                                </div>

                            </Card>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================= FEATURES ================= */}

            <section className="border-y border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-900">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="mb-12 text-center">

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
                            Why ShopSphere
                        </p>

                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Shopping made simple.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400">
                            Everything is designed to make your shopping
                            experience faster, easier and better.
                        </p>

                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        <Feature
                            icon={<Truck size={23} />}
                            title="Fast Delivery"
                            description="Get your favourite products delivered quickly and safely."
                        />

                        <Feature
                            icon={<ShieldCheck size={23} />}
                            title="Secure Shopping"
                            description="Your payments and personal information stay protected."
                        />

                        <Feature
                            icon={<Star size={23} />}
                            title="Quality Products"
                            description="Discover products from trusted brands and sellers."
                        />

                    </div>

                </div>

            </section>

            {/* ================= CATEGORIES ================= */}

            <section className="bg-[#f8faf7] py-20 dark:bg-zinc-950">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="mb-10">

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
                            Explore
                        </p>

                        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                            Shop by category
                        </h2>

                        <p className="mt-3 text-zinc-500 dark:text-zinc-400">
                            Find exactly what you're looking for.
                        </p>

                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        <Category
                            title="Electronics"
                            emoji="🎧"
                            text="Latest gadgets"
                        />

                        <Category
                            title="Fashion"
                            emoji="👟"
                            text="Style for everyone"
                        />

                        <Category
                            title="Home & Living"
                            emoji="🏠"
                            text="Make it yours"
                        />

                        <Category
                            title="Accessories"
                            emoji="⌚"
                            text="Complete your look"
                        />

                    </div>

                </div>

            </section>

            {/* ================= PRODUCTS ================= */}

            <section className="bg-white py-20 dark:bg-zinc-900">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="mb-10">

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                            Trending
                        </p>

                        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                            Popular right now
                        </h2>

                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        <ProductCard
                            emoji="⌚"
                            title="Smart Watch"
                            price="₹2,999"
                            rating="4.8"
                        />

                        <ProductCard
                            emoji="🎧"
                            title="Wireless Headphones"
                            price="₹1,999"
                            rating="4.9"
                        />

                        <ProductCard
                            emoji="👟"
                            title="Premium Sneakers"
                            price="₹3,499"
                            rating="4.7"
                        />

                        <ProductCard
                            emoji="🎒"
                            title="Urban Backpack"
                            price="₹1,499"
                            rating="4.8"
                        />

                    </div>

                </div>

            </section>

            {/* ================= STATS ================= */}

            <section className="bg-zinc-100 py-20 dark:bg-zinc-900">

                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-center md:grid-cols-4">

                    <Stat number="10K+" label="Products" />

                    <Stat number="50K+" label="Happy Customers" />

                    <Stat number="4.9/5" label="Average Rating" />

                    <Stat number="24/7" label="Customer Support" />

                </div>

            </section>

            {/* ================= CTA ================= */}

            <section className="bg-[#f8faf7] py-24 dark:bg-zinc-950">

                <div className="mx-auto max-w-5xl px-6">

                    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-orange-50 px-8 py-16 text-center shadow-xl dark:border-emerald-500/20 dark:from-emerald-950/40 dark:via-zinc-900 dark:to-orange-950/30">

                        <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/10" />

                        <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-500/10" />

                        <div className="relative">

                            <Sparkles
                                className="mx-auto text-emerald-500"
                                size={28}
                            />

                            <h2 className="mt-5 text-3xl font-black sm:text-5xl">
                                Ready to shop smarter?
                            </h2>

                            <p className="mx-auto mt-5 max-w-xl text-zinc-600 dark:text-zinc-400">
                                Explore thousands of products and discover
                                something you'll love.
                            </p>

                            <Link
                                to="/products"
                                className="mt-8 inline-block"
                            >

                                <Button
                                    size="lg"
                                    className="group rounded-full bg-emerald-600 px-8 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400"
                                >
                                    Start Shopping

                                    <ArrowRight
                                        size={18}
                                        className="ml-2 transition-transform group-hover:translate-x-1"
                                    />

                                </Button>

                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================= FOOTER ================= */}

            <footer className="relative overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-white">

                <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />

                <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />

                <div className="relative mx-auto max-w-7xl px-6">

                    <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">

                        {/* BRAND */}

                        <div className="lg:col-span-2">

                            <Link
                                to="/"
                                className="inline-flex items-center gap-2"
                            >

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/20">
                                    <ShoppingBag size={21} />
                                </div>

                                <span className="text-xl font-black">
                                    Shop
                                    <span className="text-emerald-500">
                                        Sphere
                                    </span>
                                </span>

                            </Link>

                            <p className="mt-5 max-w-sm leading-7 text-zinc-600 dark:text-zinc-400">
                                A smarter way to discover products, compare
                                your favourites and shop everything you love
                                in one place.
                            </p>

                            {/* SOCIAL LINKS */}

                            <div className="mt-7 flex gap-3">

                                <SocialButton
                                    label="𝕏"
                                    href="https://x.com"
                                />

                                <SocialButton
                                    label="in"
                                    href="https://linkedin.com"
                                />

                                <SocialButton
                                    label="◎"
                                    href="https://instagram.com"
                                />

                                <SocialButton
                                    label="▶"
                                    href="https://youtube.com"
                                />

                            </div>

                        </div>

                        {/* SHOP */}

                        <div>

                            <h3 className="mb-5 font-semibold">
                                Shop
                            </h3>

                            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">

                                <Link
                                    to="/products"
                                    className="block transition-colors hover:text-emerald-500"
                                >
                                    All Products
                                </Link>

                                <Link
                                    to="/products?category=Electronics"
                                    className="block transition-colors hover:text-emerald-500"
                                >
                                    Electronics
                                </Link>

                                <Link
                                    to="/products?category=Fashion"
                                    className="block transition-colors hover:text-emerald-500"
                                >
                                    Fashion
                                </Link>

                                <Link
                                    to="/products?category=Home"
                                    className="block transition-colors hover:text-emerald-500"
                                >
                                    Home & Living
                                </Link>

                            </div>

                        </div>

                        {/* COMPANY */}

                        <div>

                            <h3 className="mb-5 font-semibold">
                                Company
                            </h3>

                            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">

                                <Link
                                    to="/about"
                                    className="block transition-colors hover:text-emerald-500"
                                >
                                    About Us
                                </Link>

                                <Link
                                    to="/contact"
                                    className="block transition-colors hover:text-emerald-500"
                                >
                                    Contact
                                </Link>

                                <Link
                                    to="/privacy"
                                    className="block transition-colors hover:text-emerald-500"
                                >
                                    Privacy Policy
                                </Link>

                                <Link
                                    to="/terms"
                                    className="block transition-colors hover:text-emerald-500"
                                >
                                    Terms
                                </Link>

                            </div>

                        </div>

                        {/* NEWSLETTER */}

                        <div>

                            <h3 className="mb-5 font-semibold">
                                Stay updated
                            </h3>

                            <p className="mb-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                Get new arrivals and exclusive offers
                                straight to your inbox.
                            </p>

                            <form
                                onSubmit={handleSubscribe}
                                className="flex overflow-hidden rounded-xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                            >

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white"
                                />

                                <button
                                    type="submit"
                                    className="m-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-black transition-colors hover:bg-emerald-400"
                                >
                                    <ArrowRight size={18} />
                                </button>

                            </form>

                            {message && (
                                <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                                    {message}
                                </p>
                            )}

                        </div>

                    </div>

                    {/* BOTTOM */}

                    <div className="flex flex-col gap-4 border-t border-zinc-200 py-6 text-sm text-zinc-500 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">

                        <p>
                            © 2026 ShopSphere. All rights reserved.
                        </p>

                        <div className="flex gap-6">
                            <span>Secure Payments</span>
                            <span>Fast Delivery</span>
                        </div>

                    </div>

                </div>

            </footer>

        </main>
    );
};

/* ================= FEATURE ================= */

const Feature = ({ icon, title, description }) => {
    return (
        <div className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-500/30">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110 dark:bg-emerald-500/10 dark:text-emerald-400">
                {icon}
            </div>

            <h3 className="text-lg font-bold">
                {title}
            </h3>

            <p className="mt-2 leading-6 text-zinc-500 dark:text-zinc-400">
                {description}
            </p>

        </div>
    );
};

/* ================= CATEGORY ================= */

const Category = ({ title, emoji, text }) => {
    return (
        <Link
            to={`/products?category=${encodeURIComponent(title)}`}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500/30"
        >

            <div className="text-5xl transition-transform duration-500 group-hover:scale-110">
                {emoji}
            </div>

            <h3 className="mt-6 text-lg font-bold">
                {title}
            </h3>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {text}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">

                Explore

                <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                />

            </div>

        </Link>
    );
};

/* ================= PRODUCT ================= */

const ProductCard = ({
    emoji,
    title,
    price,
    rating,
}) => {
    return (
        <Card className="group overflow-hidden rounded-2xl border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">

            <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-emerald-50 to-orange-50 dark:from-emerald-950/30 dark:to-orange-950/20">

                <span className="text-7xl transition-transform duration-500 group-hover:scale-110">
                    {emoji}
                </span>

                <button
                    type="button"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:text-red-500 dark:bg-zinc-900"
                >
                    <Heart size={17} />
                </button>

            </div>

            <div className="p-5">

                <h3 className="font-semibold">
                    {title}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-sm text-orange-500">

                    <Star
                        size={14}
                        fill="currentColor"
                    />

                    {rating}

                </div>

                <div className="mt-4 flex items-center justify-between">

                    <p className="text-lg font-bold">
                        {price}
                    </p>

                    <Button
                        size="sm"
                        className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400"
                    >
                        Add
                    </Button>

                </div>

            </div>

        </Card>
    );
};

/* ================= STAT ================= */

const Stat = ({ number, label }) => {
    return (
        <div>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 sm:text-4xl">
                {number}
            </p>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
        </div>
    );
};

/* ================= SOCIAL ================= */

const SocialButton = ({ label, href }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-sm font-semibold text-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500 hover:text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
        >
            {label}
        </a>
    );
};

export default Home;