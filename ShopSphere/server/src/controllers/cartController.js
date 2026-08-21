import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({
            user: userId,
        }).populate("items.product");

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [],
            });
        }

        // Calculate total
        let totalAmount = 0;

        cart.items.forEach((item) => {
            if (item.product) {
                totalAmount +=
                    item.product.price * item.quantity;
            }
        });

        res.status(200).json({
            ...cart.toObject(),
            totalAmount,
        });
    } catch (error) {
        console.error("Get cart error:", error);

        res.status(500).json({
            message: "Error fetching cart",
            error: error.message,
        });
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const { productId, quantity = 1 } = req.body;

        // Validate productId
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
            });
        }

        // Validate quantity
        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1",
            });
        }

        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Not enough stock",
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({
            user: userId,
        });

        // Create cart if not exists
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [],
            });
        }

        // Check existing product
        const existingItem = cart.items.find(
            (item) =>
                item.product.toString() === productId.toString()
        );

        if (existingItem) {
            const newQuantity =
                existingItem.quantity + quantity;

            if (newQuantity > product.stock) {
                return res.status(400).json({
                    message: "Not enough stock",
                });
            }

            existingItem.quantity = newQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity,
            });
        }

        await cart.save();

        await cart.populate("items.product");

        // Calculate total
        let totalAmount = 0;

        cart.items.forEach((item) => {
            if (item.product) {
                totalAmount +=
                    item.product.price * item.quantity;
            }
        });

        res.status(201).json({
            ...cart.toObject(),
            totalAmount,
        });
    } catch (error) {
        console.error("Add to cart error:", error);

        res.status(500).json({
            message: "Error adding product to cart",
            error: error.message,
        });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;

        const { productId } = req.params;
        const { quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
            });
        }

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Not enough stock",
            });
        }

        const cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        const item = cart.items.find(
            (item) =>
                item.product.toString() === productId.toString()
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart",
            });
        }

        item.quantity = quantity;

        await cart.save();

        await cart.populate("items.product");

        let totalAmount = 0;

        cart.items.forEach((item) => {
            if (item.product) {
                totalAmount +=
                    item.product.price * item.quantity;
            }
        });

        res.status(200).json({
            ...cart.toObject(),
            totalAmount,
        });
    } catch (error) {
        console.error("Update cart error:", error);

        res.status(500).json({
            message: "Error updating cart",
            error: error.message,
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            (item) =>
                item.product.toString() !== productId.toString()
        );

        await cart.save();

        await cart.populate("items.product");

        let totalAmount = 0;

        cart.items.forEach((item) => {
            if (item.product) {
                totalAmount +=
                    item.product.price * item.quantity;
            }
        });

        res.status(200).json({
            ...cart.toObject(),
            totalAmount,
        });
    } catch (error) {
        console.error("Remove cart item error:", error);

        res.status(500).json({
            message: "Error removing product from cart",
            error: error.message,
        });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            message: "Cart cleared successfully",
            cart,
        });
    } catch (error) {
        console.error("Clear cart error:", error);

        res.status(500).json({
            message: "Error clearing cart",
            error: error.message,
        });
    }
};

export { getCart, addToCart, updateCartItem, removeFromCart, clearCart, };