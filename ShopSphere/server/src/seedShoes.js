import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const shoes = [
    {
        name: "Classic White Sneakers",
        description: "Clean and comfortable sneakers for everyday casual wear.",
        price: 1999,
        category: "Shoes",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        stock: 20,
        brand: "UrbanStep",
    },
    {
        name: "Black Running Shoes",
        description: "Lightweight running shoes designed for daily workouts.",
        price: 2499,
        category: "Shoes",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
        stock: 20,
        brand: "SportX",
    },
    {
        name: "Women's Casual Sneakers",
        description: "Stylish casual sneakers with a comfortable everyday fit.",
        price: 1899,
        category: "Shoes",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        stock: 20,
        brand: "StyleStep",
    },
    {
        name: "Premium Brown Loafers",
        description: "Smart brown loafers for office and formal occasions.",
        price: 2999,
        category: "Shoes",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509",
        stock: 20,
        brand: "GentleStep",
    },
    {
        name: "Women's Running Shoes",
        description: "Comfortable lightweight shoes for running and workouts.",
        price: 2299,
        category: "Shoes",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
        stock: 20,
        brand: "FitWalk",
    },
    {
        name: "High Top Street Sneakers",
        description: "Trendy high-top sneakers for a modern streetwear look.",
        price: 2699,
        category: "Shoes",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
        stock: 20,
        brand: "StreetX",
    },
    {
        name: "Beige Casual Shoes",
        description: "Minimal beige shoes designed for everyday outfits.",
        price: 1799,
        category: "Shoes",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
        stock: 20,
        brand: "UrbanStep",
    },
    {
        name: "Formal Black Oxford",
        description: "Classic black Oxford shoes for formal and professional wear.",
        price: 3299,
        category: "Shoes",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
        stock: 20,
        brand: "GentleStep",
    },
    {
        name: "Pink Fashion Sneakers",
        description: "Fashion-forward pink sneakers with a comfortable sole.",
        price: 2199,
        category: "Shoes",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1554130840-8d8f5f9c6e7c",
        stock: 20,
        brand: "StyleStep",
    },
    {
        name: "Sporty Grey Sneakers",
        description: "Versatile grey sneakers suitable for casual and active wear.",
        price: 2399,
        category: "Shoes",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3",
        stock: 20,
        brand: "SportX",
    },
];

const seedShoes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.insertMany(shoes);

        console.log("10 Shoes added successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedShoes();