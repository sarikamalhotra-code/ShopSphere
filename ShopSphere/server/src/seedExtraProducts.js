import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [

    // ================= SHOES =================

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

    // ================= BAGS =================

    {
        name: "Classic Black Handbag",
        description: "Elegant black handbag for everyday use.",
        price: 1599,
        category: "Bags",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        stock: 20,
        brand: "BagAura",
    },
    {
        name: "Brown Leather Backpack",
        description: "Premium brown backpack with a spacious everyday design.",
        price: 2199,
        category: "Bags",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        stock: 20,
        brand: "UrbanBag",
    },
    {
        name: "Women's Mini Shoulder Bag",
        description: "Compact shoulder bag perfect for casual outings.",
        price: 1299,
        category: "Bags",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c",
        stock: 20,
        brand: "StyleBag",
    },
    {
        name: "Black Travel Backpack",
        description: "Durable backpack suitable for travel and daily use.",
        price: 2499,
        category: "Bags",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3",
        stock: 20,
        brand: "TravelPro",
    },
    {
        name: "Beige Tote Bag",
        description: "Spacious beige tote bag for everyday shopping and work.",
        price: 1199,
        category: "Bags",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e",
        stock: 20,
        brand: "BagAura",
    },
    {
        name: "Men's Office Bag",
        description: "Professional office bag with a clean modern design.",
        price: 2299,
        category: "Bags",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
        stock: 20,
        brand: "WorkBag",
    },
    {
        name: "Pink Fashion Bag",
        description: "Stylish pink handbag designed for fashionable outfits.",
        price: 1499,
        category: "Bags",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d",
        stock: 20,
        brand: "StyleBag",
    },
    {
        name: "Canvas Casual Backpack",
        description: "Lightweight canvas backpack for college and casual use.",
        price: 999,
        category: "Bags",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
        stock: 20,
        brand: "CampusBag",
    },
    {
        name: "Luxury Brown Handbag",
        description: "Premium brown handbag with an elegant luxury finish.",
        price: 2799,
        category: "Bags",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1585488433655-6e5b6f6b0f5b",
        stock: 20,
        brand: "LuxeBag",
    },
    {
        name: "Black Crossbody Bag",
        description: "Compact crossbody bag for comfortable everyday carrying.",
        price: 1399,
        category: "Bags",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
        stock: 20,
        brand: "UrbanBag",
    },

    // ================= ACCESSORIES =================

    {
        name: "Classic Black Sunglasses",
        description: "Stylish black sunglasses for everyday fashion.",
        price: 799,
        category: "Accessories",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        stock: 20,
        brand: "ShadeX",
    },
    {
        name: "Minimal Silver Bracelet",
        description: "Minimal silver bracelet with a clean elegant design.",
        price: 699,
        category: "Accessories",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d",
        stock: 20,
        brand: "SilverLine",
    },
    {
        name: "Leather Wallet",
        description: "Classic leather wallet with multiple card compartments.",
        price: 899,
        category: "Accessories",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
        stock: 20,
        brand: "LeatherCraft",
    },
    {
        name: "Gold Fashion Earrings",
        description: "Elegant gold-tone earrings for stylish occasions.",
        price: 599,
        category: "Accessories",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
        stock: 20,
        brand: "GoldenStyle",
    },
    {
        name: "Classic Leather Belt",
        description: "Premium leather belt suitable for casual and formal outfits.",
        price: 999,
        category: "Accessories",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        stock: 20,
        brand: "BeltPro",
    },
    {
        name: "Fashion Hair Clip Set",
        description: "Trendy hair clips for everyday styling.",
        price: 399,
        category: "Accessories",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
        stock: 20,
        brand: "StyleAura",
    },
    {
        name: "Premium Card Holder",
        description: "Compact card holder with a sleek modern design.",
        price: 699,
        category: "Accessories",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1601592996763-f2d2f2f5f7c1",
        stock: 20,
        brand: "UrbanCraft",
    },
    {
        name: "Classic Cap",
        description: "Comfortable everyday cap with a minimal design.",
        price: 499,
        category: "Accessories",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
        stock: 20,
        brand: "StreetX",
    },
    {
        name: "Elegant Pearl Necklace",
        description: "Elegant pearl necklace for a sophisticated look.",
        price: 1299,
        category: "Accessories",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
        stock: 20,
        brand: "PearlStyle",
    },
    {
        name: "Men's Classic Sunglasses",
        description: "Modern sunglasses with a classic frame for everyday wear.",
        price: 899,
        category: "Accessories",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4",
        stock: 20,
        brand: "ShadeX",
    },
];

const seedExtraProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.insertMany(products);

        console.log("30 products added successfully!");
        console.log("10 Shoes + 10 Bags + 10 Accessories");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedExtraProducts();