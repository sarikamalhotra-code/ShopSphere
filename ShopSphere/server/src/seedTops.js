import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const tops = [
    {
        name: "Floral Summer Top",
        description: "Lightweight floral top for a stylish summer look.",
        price: 899,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1564257577054-6e1d3f9e8c9b",
        stock: 20,
        brand: "StyleAura",
    },
    {
        name: "White Casual Top",
        description: "Simple white casual top perfect for everyday outfits.",
        price: 799,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
        stock: 20,
        brand: "UrbanStyle",
    },
    {
        name: "Black Ribbed Top",
        description: "Comfortable ribbed black top with a modern fit.",
        price: 999,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        stock: 20,
        brand: "ModeWear",
    },
    {
        name: "Pink Casual Top",
        description: "Soft pink casual top for everyday styling.",
        price: 849,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
        stock: 20,
        brand: "StyleAura",
    },
    {
        name: "Blue Denim Top",
        description: "Trendy denim-inspired top with a comfortable fit.",
        price: 1199,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        stock: 20,
        brand: "DenimCo",
    },
    {
        name: "Beige Oversized Top",
        description: "Relaxed oversized beige top for a modern streetwear look.",
        price: 1099,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
        stock: 20,
        brand: "UrbanStyle",
    },
    {
        name: "Green Printed Top",
        description: "Fresh green printed top with a stylish pattern.",
        price: 949,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
        stock: 20,
        brand: "FashionHub",
    },
    {
        name: "Cream Knit Top",
        description: "Soft knit cream top suitable for casual occasions.",
        price: 1299,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
        stock: 20,
        brand: "LuxeWear",
    },
    {
        name: "Striped Casual Top",
        description: "Classic striped top designed for effortless everyday style.",
        price: 899,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        stock: 20,
        brand: "ClassicFit",
    },
    {
        name: "Lavender Fashion Top",
        description: "Elegant lavender top with a contemporary silhouette.",
        price: 1099,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        stock: 20,
        brand: "LuxeWear",
    },
    {
        name: "Yellow Summer Top",
        description: "Bright yellow summer top with a lightweight design.",
        price: 799,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
        stock: 20,
        brand: "SunStyle",
    },
    {
        name: "Brown Crop Top",
        description: "Modern brown crop top for casual and trendy outfits.",
        price: 749,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        stock: 20,
        brand: "TrendFit",
    },
    {
        name: "Sky Blue Top",
        description: "Soft sky blue top with a comfortable everyday fit.",
        price: 899,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        stock: 20,
        brand: "StyleAura",
    },
    {
        name: "Maroon Casual Top",
        description: "Rich maroon casual top designed for stylish daily wear.",
        price: 949,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        stock: 20,
        brand: "ModeWear",
    },
    {
        name: "White Printed Top",
        description: "Minimal white printed top with a relaxed comfortable fit.",
        price: 849,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
        stock: 20,
        brand: "FashionHub",
    },
    {
        name: "Black Off Shoulder Top",
        description: "Stylish black off-shoulder top for evening and casual looks.",
        price: 1199,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
        stock: 20,
        brand: "LuxeWear",
    },
    {
        name: "Peach Summer Top",
        description: "Light peach top designed for comfortable summer styling.",
        price: 899,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
        stock: 20,
        brand: "SunStyle",
    },
    {
        name: "Grey Basic Top",
        description: "Versatile grey basic top that works with everyday outfits.",
        price: 699,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
        stock: 20,
        brand: "ClassicFit",
    },
    {
        name: "Red Fashion Top",
        description: "Bold red fashion top designed for a confident modern look.",
        price: 999,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        stock: 20,
        brand: "TrendFit",
    },
    {
        name: "Blue Floral Top",
        description: "Beautiful blue floral top for casual and weekend outfits.",
        price: 949,
        category: "Tops",
        gender: "Women",
        image: "https://images.unsplash.com/photo-1506629905607-d9c297d7b5a8",
        stock: 20,
        brand: "StyleAura",
    },
];

const seedTops = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.insertMany(tops);

        console.log("20 Women Tops added successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedTops();