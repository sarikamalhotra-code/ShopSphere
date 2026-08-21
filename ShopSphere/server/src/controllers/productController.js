import Product from "../models/Product.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            error: error.message,
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
};

const updateProducts = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        return res.status(500).json({
            message: "Error Updating Product",
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully",
            product
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
};

export { getProducts, getProductById, createProduct, updateProducts, deleteProduct };