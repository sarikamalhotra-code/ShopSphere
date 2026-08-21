import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const watches = [
    {
        name: "Classic Silver Chronograph",
        description: "Elegant silver chronograph watch for everyday and formal wear.",
        price: 3499,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        stock: 20,
        brand: "ChronoX",
    },
    {
        name: "Luxury Black Watch",
        description: "Premium black dial watch with a sophisticated modern design.",
        price: 4299,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
        stock: 20,
        brand: "TimeCraft",
    },
    {
        name: "Minimal Gold Watch",
        description: "Minimal golden watch designed for a clean and stylish look.",
        price: 2999,
        category: "Watches",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
        stock: 20,
        brand: "Elegance",
    },
    {
        name: "Rose Gold Premium Watch",
        description: "Beautiful rose gold watch with a premium finish.",
        price: 3899,
        category: "Watches",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        stock: 20,
        brand: "LuxeTime",
    },
    {
        name: "Sport Black Watch",
        description: "Sporty black watch built for active everyday use.",
        price: 2499,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8",
        stock: 20,
        brand: "ActivePro",
    },
    {
        name: "Classic Leather Watch",
        description: "Classic leather strap watch with a timeless appearance.",
        price: 3199,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1495857000853-fe46c8aefc30",
        stock: 20,
        brand: "ClassicTime",
    },
    {
        name: "Elegant White Dial",
        description: "Clean white dial watch with a sophisticated design.",
        price: 2799,
        category: "Watches",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56",
        stock: 20,
        brand: "Elite",
    },
    {
        name: "Premium Steel Watch",
        description: "Stainless steel watch designed for premium everyday styling.",
        price: 4599,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
        stock: 20,
        brand: "SteelWorks",
    },
    {
        name: "Modern Fashion Watch",
        description: "Modern fashion watch with a stylish contemporary design.",
        price: 2299,
        category: "Watches",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561",
        stock: 20,
        brand: "ModeTime",
    },
    {
        name: "Executive Black Dial",
        description: "Professional black dial watch for office and business wear.",
        price: 3999,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1520223297771-6e7c9c7b7b3c",
        stock: 20,
        brand: "Executive",
    },
    {
        name: "Diamond Style Watch",
        description: "Elegant fashion watch inspired by luxury diamond designs.",
        price: 4999,
        category: "Watches",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
        stock: 20,
        brand: "RoyalTime",
    },
    {
        name: "Urban Blue Dial",
        description: "Stylish blue dial watch made for modern urban looks.",
        price: 2899,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0",
        stock: 20,
        brand: "UrbanTime",
    },
    {
        name: "Classic Brown Leather",
        description: "Brown leather strap watch with a classic premium finish.",
        price: 3299,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
        stock: 20,
        brand: "LeatherCraft",
    },
    {
        name: "Elegant Mesh Watch",
        description: "Elegant mesh strap watch with a lightweight comfortable design.",
        price: 2699,
        category: "Watches",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5",
        stock: 20,
        brand: "MeshStyle",
    },
    {
        name: "Midnight Black Chronograph",
        description: "Bold midnight black chronograph with a premium sporty look.",
        price: 4199,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6",
        stock: 20,
        brand: "ChronoMax",
    },
    {
        name: "Rose Classic Analog",
        description: "Beautiful analog watch with a soft rose finish.",
        price: 3099,
        category: "Watches",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
        stock: 20,
        brand: "RoseTime",
    },
    {
        name: "Premium Blue Steel",
        description: "Blue dial and steel bracelet watch for a premium appearance.",
        price: 4499,
        category: "Watches",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
        stock: 20,
        brand: "BlueSteel",
    },
    {
        name: "Fashion Gold Mesh",
        description: "Golden mesh fashion watch designed for elegant outfits.",
        price: 3599,
        category: "Watches",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
        stock: 20,
        brand: "GoldenStyle",
    },
    {
        name: "Adventure Sport Watch",
        description: "Durable sporty watch designed for an active lifestyle.",
        price: 3799,
        category: "Watches",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1526045431048-f857369baa09",
        stock: 20,
        brand: "AdventureX",
    },
    {
        name: "Signature Luxury Watch",
        description: "Premium signature watch with a refined luxury appearance.",
        price: 5999,
        category: "Watches",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        stock: 20,
        brand: "Signature",
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.insertMany(watches);

        console.log("20 watches added successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);

        process.exit(1);
    }
};

seedProducts();