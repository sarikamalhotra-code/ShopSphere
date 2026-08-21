import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const jeans = [
    {
        name: "Classic Blue Straight Jeans",
        description: "Classic straight-fit blue jeans for everyday comfort.",
        price: 1499,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        stock: 20,
        brand: "DenimCo",
    },
    {
        name: "Dark Blue Slim Jeans",
        description: "Slim-fit dark blue jeans with a modern everyday look.",
        price: 1699,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1475178626620-a4d074967452",
        stock: 20,
        brand: "UrbanDenim",
    },
    {
        name: "High Waist Black Jeans",
        description: "High-waisted black jeans designed for a stylish silhouette.",
        price: 1599,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec",
        stock: 20,
        brand: "StyleAura",
    },
    {
        name: "Light Wash Relaxed Jeans",
        description: "Relaxed-fit light wash jeans for casual everyday outfits.",
        price: 1399,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        stock: 20,
        brand: "DenimWorks",
    },
    {
        name: "Wide Leg Blue Jeans",
        description: "Trendy wide-leg jeans with a comfortable relaxed fit.",
        price: 1799,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27",
        stock: 20,
        brand: "TrendFit",
    },
    {
        name: "Black Regular Fit Jeans",
        description: "Versatile black regular-fit jeans for everyday styling.",
        price: 1499,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f",
        stock: 20,
        brand: "ClassicFit",
    },
    {
        name: "Mom Fit Blue Jeans",
        description: "Comfortable mom-fit jeans with a vintage-inspired look.",
        price: 1599,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb",
        stock: 20,
        brand: "UrbanStyle",
    },
    {
        name: "Grey Slim Jeans",
        description: "Modern grey slim-fit jeans suitable for casual occasions.",
        price: 1699,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        stock: 20,
        brand: "DenimCo",
    },
    {
        name: "Dark Wash Skinny Jeans",
        description: "Stylish dark-wash skinny jeans with a flattering fit.",
        price: 1799,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        stock: 20,
        brand: "ModeWear",
    },
    {
        name: "Blue Tapered Jeans",
        description: "Tapered blue jeans combining comfort with a modern fit.",
        price: 1599,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab",
        stock: 20,
        brand: "UrbanDenim",
    },
    {
        name: "Vintage Wash Jeans",
        description: "Vintage-wash jeans with a relaxed casual appearance.",
        price: 1699,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
        stock: 20,
        brand: "VintageWear",
    },
    {
        name: "Stone Wash Denim",
        description: "Stone-washed denim jeans with a classic streetwear style.",
        price: 1499,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1514311548100-27c5b5a7f0e5",
        stock: 20,
        brand: "DenimWorks",
    },
    {
        name: "Straight Black Jeans",
        description: "Minimal straight-fit black jeans for versatile styling.",
        price: 1599,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        stock: 20,
        brand: "StyleAura",
    },
    {
        name: "Classic Dark Denim",
        description: "Dark denim jeans designed for smart casual outfits.",
        price: 1799,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1475178626620-a4d074967452",
        stock: 20,
        brand: "ClassicFit",
    },
    {
        name: "Flared Blue Jeans",
        description: "Fashionable flared blue jeans with a stylish retro feel.",
        price: 1899,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27",
        stock: 20,
        brand: "TrendFit",
    },
    {
        name: "Cargo Style Denim",
        description: "Relaxed cargo-style denim with a contemporary streetwear look.",
        price: 1999,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        stock: 20,
        brand: "UrbanDenim",
    },
    {
        name: "Blue Ankle Jeans",
        description: "Comfortable ankle-length blue jeans for everyday wear.",
        price: 1499,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb",
        stock: 20,
        brand: "ModeWear",
    },
    {
        name: "Classic Straight Denim",
        description: "Straight-fit denim designed for comfortable daily styling.",
        price: 1399,
        category: "Jeans",
        gender: "Men",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        stock: 20,
        brand: "DenimCo",
    },
    {
        name: "High Rise Blue Denim",
        description: "High-rise blue denim with a modern flattering fit.",
        price: 1799,
        category: "Jeans",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
        stock: 20,
        brand: "StyleAura",
    },
    {
        name: "Premium Blue Jeans",
        description: "Premium denim jeans with a clean modern finish.",
        price: 2199,
        category: "Jeans",
        gender: "Unisex",
        image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab",
        stock: 20,
        brand: "LuxeDenim",
    },
];

const seedJeans = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.insertMany(jeans);

        console.log("20 Jeans added successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedJeans();