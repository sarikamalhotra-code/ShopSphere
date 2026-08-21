import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            enum: ["Men", "Women", "Unisex"],
            default: "Unisex",
        },

        image: {
            type: String,
            default: "",
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        brand: {
            type: String,
            default: "",
            trim: true,
        },

        rating: {
            type: Number,
            default: 4.5,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product",productSchema);

export default Product;