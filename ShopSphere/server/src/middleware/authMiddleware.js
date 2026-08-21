import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized, no token",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = {
            id: decoded.id || decoded._id || decoded.userId,
            role: decoded.role,
        };

        if (!req.user.id) {
            return res.status(401).json({
                message: "Invalid user information in token",
            });
        }

        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);

        return res.status(401).json({
            message: "Not authorized, invalid token",
        });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }

    return res.status(403).json({
        message: "Access denied. Admin only.",
    });
};

export { protect, admin };