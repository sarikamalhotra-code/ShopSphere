import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const getAdminStats = async (req, res) => {
    try {
        const users = await User.countDocuments();
        const products = await Product.countDocuments();
        const orders = await Order.countDocuments();

        // Calculate total revenue
        // Cancelled orders are excluded
        const revenueResult = await Order.aggregate([
            {
                $match: {
                    orderStatus: {
                        $ne: "Cancelled",
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]);

        const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
        return res.status(200).json({
            users,
            products,
            orders,
            revenue,
        });
    } catch (error) {
        console.error("Admin stats error:", error);

        return res.status(500).json({
            message: "Error fetching admin stats",
            error: error.message,
        });
    }
};

const getRecentOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product")
            .sort({createdAt: -1,})
            .limit(5);
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Recent orders error:", error);

        return res.status(500).json({
            message: "Error fetching recent orders",
            error: error.message,
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product")
            .sort({createdAt: -1,});
            return res.status(200).json(orders);
        } catch (error) {
        console.error("All orders error:", error);

        return res.status(500).json({
            message: "Error fetching orders",
            error: error.message,
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = [
            "Placed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        // Validate status
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        // IMPORTANT:
        // Order schema uses "orderStatus"
        // NOT "status"

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                orderStatus: status,
            },
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("user", "name email")
            .populate("items.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        return res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.error(
            "Update order status error:",
            error
        );

        return res.status(500).json({
            message: "Error updating order status",
            error: error.message,
        });
    }
};

export { getAdminStats, getRecentOrders, getAllOrders, updateOrderStatus, };