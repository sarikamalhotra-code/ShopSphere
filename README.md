# 🛍️ ShopSphere

ShopSphere is a full-stack e-commerce web application built using the MERN stack.

It provides a complete shopping experience for customers along with an admin dashboard for managing products, users, and orders.

## 🌐 Live Demo

🔗 **Frontend:** https://shopsphere-pied-zeta.vercel.app

🔗 **Backend API:** https://shopsphere-8v7i.onrender.com

---

## 🚀 Features

### 👤 User Features

- User Registration
- User Login & Logout
- JWT Authentication
- Browse Products
- Product Details
- Add Products to Cart
- Update Cart Quantity
- Remove Products from Cart
- Checkout
- Cash on Delivery (COD)
- View Order History
- View Order Details
- Track Order Status

### 🛠️ Admin Features

- Admin Authentication
- Admin Dashboard
- View Dashboard Statistics
- Manage Products
- Add Products
- Edit Products
- Delete Products
- Manage Users
- View Customer Orders
- Update Order Status
- Automatic COD Payment Status Update
- Recent Orders Dashboard

---

## 💳 Payment

Currently, ShopSphere supports:

- Cash on Delivery (COD)

For COD orders:

- Payment status remains `Pending` before delivery.
- Payment status automatically changes to `Paid` when the order is marked as `Delivered`.

---

## 🧑‍💻 Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Shadcn UI
- Axios
- Lucide React
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- CORS

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure
ShopSphere/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── public/
    ├── package.json
    └── vite.config.js

🔐 Authentication

ShopSphere uses JWT-based authentication.

After login, the authentication token is stored on the client and automatically attached to API requests using an Axios interceptor.

Protected routes are available for:

Customers
Admins
📦 Order Management

The application supports the following order statuses:

Placed
Processing
Shipped
Delivered
Cancelled

For COD orders, the payment status is automatically updated when the order is delivered.

⚙️ Environment Variables
Backend

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Frontend

The frontend uses the deployed backend API:

https://shopsphere-8v7i.onrender.com/api
🛠️ Local Setup
1. Clone the repository
git clone https://github.com/sarikamalhotra-code/ShopSphere.git
2. Backend Setup
cd ShopSphere/server
npm install
npm run dev

Backend runs on:

http://localhost:5000
3. Frontend Setup

Open another terminal:

cd ShopSphere/client
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔗 API Base URL

Production API:

https://shopsphere-8v7i.onrender.com/api

Main API modules:

/api/auth
/api/products
/api/cart
/api/orders
/api/users
/api/admin
📊 Admin Dashboard

The admin dashboard provides:

Total Revenue
Total Orders
Total Products
Total Customers
Revenue Analytics
Order Activity
Category Sales
Recent Orders
Product Management
User Management
Order Management
📱 Responsive Design

ShopSphere is designed to work across:

Desktop
Laptop
Tablet
Mobile
🔒 Security

JWT authentication
Password hashing using bcrypt
Protected admin routes
Protected user routes
Environment variables for sensitive credentials
CORS configuration
.env excluded from Git

👩‍💻 Author

Sarika Malhotra

GitHub:
https://github.com/sarikamalhotra-code

⭐ Project

If you like this project, consider giving the repository a ⭐ on GitHub.

Built with ❤️ using the MERN Stack.
