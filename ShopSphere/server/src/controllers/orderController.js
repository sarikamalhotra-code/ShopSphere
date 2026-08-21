import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod = "COD", } = req.body;
        // Validate shipping address
        if (
            !shippingAddress ||
            !shippingAddress.fullName ||
            !shippingAddress.phone ||
            !shippingAddress.address ||
            !shippingAddress.city ||
            !shippingAddress.state ||
            !shippingAddress.pincode
        ) {
            return res.status(400).json({
                message: "Please provide complete shipping address",
            });
        }

        const { fullName, phone, address, city, state, pincode, } = shippingAddress;
        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id, }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty",
            });
        }

        // Prepare order items
        const orderItems = [];
        for (const item of cart.items) {
            const product = await Product.findById(
                item.product._id
            );

            if (!product) {
                return res.status(404).json({
                    message: `Product ${item.product.name} not found`,
                });
            }

            // Check stock
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`,
                });
            }

            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.image || "",
                price: product.price,
                quantity: item.quantity,
            });
        }
        const totalAmount = orderItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            shippingAddress: {
                fullName,
                phone,
                address,
                city,
                state,
                pincode,
            },

            totalAmount,
            paymentMethod,
            paymentStatus: "Pending",
            orderStatus: "Placed",
        });

        for (const item of orderItems) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        cart.items = [];
        await cart.save();
        const populatedOrder = await Order.findById(order._id).populate("items.product");
        return res.status(201).json({
            message: "Order placed successfully",
            order: populatedOrder,
        });

    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({
            message: "Error creating order",
            error: error.message,
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id,
        })
            .populate("items.product")
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);

    } catch (error) {
        console.error("Get orders error:", error);

        return res.status(500).json({
            message: "Error fetching orders",
            error: error.message,
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id,
        }).populate("items.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        return res.status(200).json(order);

    } catch (error) {
        console.error("Get order error:", error);

        return res.status(500).json({
            message: "Error fetching order",
            error: error.message,
        });
    }
};

export { createOrder, getMyOrders, getOrderById, };