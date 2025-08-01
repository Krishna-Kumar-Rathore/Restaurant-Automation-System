# Restaurant Automation System

A full-stack web application for restaurant management with customer ordering and admin panel.

## Features

- **Customer Portal**: Browse menu, add to cart, place orders, track order status
- **Admin Panel**: Manage foods, categories, orders, employees with dashboard analytics
- **Authentication**: User registration/login with role-based access (Customer/Admin)
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Simple session-based (no JWT/encryption for simplicity)

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-automation-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   echo "MONGODB_URI=mongodb://localhost:27017/restaurant_db" > .env
   echo "PORT=5000" >> .env
   
   # Seed sample data
   node seedData.js
   
   # Start backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env file
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   
   # Start frontend server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Demo Accounts

- **Admin**: admin@restaurant.com / admin123
- **Customer**: customer@test.com / customer123

## Project Structure

```
restaurant-automation-system/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── seedData.js      # Sample data
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # State management
│   │   └── utils/       # API services
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Food & Orders
- `GET /api/food` - Get all foods
- `GET /api/category` - Get categories
- `POST /api/cart/add` - Add to cart
- `POST /api/orders/create` - Place order
- `GET /api/orders/my-orders` - User orders

### Admin (Admin only)
- `GET /api/admin/dashboard` - Dashboard data
- `POST /api/food` - Create food item
- `GET /api/employees` - Manage employees

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- MongoDB connection: `mongodb://localhost:27017/restaurant_db`

## License

This project is **not open source** and is **not licensed for public use**.  
All rights are reserved by **Krishna Kumar Rathore**.  
You may not use, copy, modify, or distribute any part of this project without explicit permission.
