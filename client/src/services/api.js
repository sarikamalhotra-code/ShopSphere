import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post("/auth/login", userData);

    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    if (response.data.user) {
        localStorage.setItem("user",
            JSON.stringify(response.data.user)
        );

        if (response.data.user.role) {
            localStorage.setItem("role", response.data.user.role);
        }
    }

    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
};

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const getCart = async () => {
    const response = await api.get("/cart");
    return response.data;
};

export const addToCart = async ( productId, quantity = 1) => {
    const response = await api.post("/cart", {
        productId,
        quantity,
    });

    return response.data;
};

export const updateCartItem = async (productId, quantity) => {
    const response = await api.put(`/cart/${productId}`,
        {
            quantity,
        }
    );
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete("/cart");
    return response.data;
};

export const createOrder = async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
};

export const getMyOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
};

export const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

export const getAdminStats = async () => {
    const response = await api.get("/admin/stats");
    return response.data;
};

export const getAllOrders = async () => {
    const response = await api.get("/admin/orders");
    return response.data;
};

export const getRecentOrders = async () => {
    const response = await api.get("/admin/recent-orders");
    return response.data;
};

export const updateOrderStatus = async (id,status) => {
    const response = await api.put(`/admin/orders/${id}/status`,
        {
            status,
        }
    );

    return response.data;
};

export default api;