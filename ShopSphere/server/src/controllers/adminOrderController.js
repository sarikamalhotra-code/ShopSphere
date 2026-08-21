import Order from "../models/Order.js";

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "name image")
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Get all orders error:", error);

        return res.status(500).json({
            message: "Error fetching all orders",
            error: error.message,
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Allowed order statuses
        const allowedStatuses = [
            "Placed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        // Validate status
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        // Find order
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.orderStatus = status;
        if (order.paymentMethod === "COD") {
            if (status === "Delivered") {
                order.paymentStatus = "Paid";
            } else if (status === "Cancelled") {
                order.paymentStatus = "Pending";
            }
        }

        // Save order
        await order.save();

        const updatedOrder = await Order.findById(order._id)
            .populate("user", "name email")
            .populate("items.product", "name image");

        return res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Update order status error:", error);

        return res.status(500).json({
            message: "Error updating order status",
            error: error.message,
        });
    }
};

export { getAllOrders, updateOrderStatus, };