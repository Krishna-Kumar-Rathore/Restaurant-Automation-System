const express = require('express');
const Order = require('../models/Order');
const Food = require('../models/Food');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Category = require('../models/Category');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Dashboard statistics
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today's orders and revenue
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const todayRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: today, $lt: tomorrow },
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    // Total statistics
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalFoodItems = await Food.countDocuments({ isAvailable: true });
    const totalEmployees = await Employee.countDocuments({ isActive: true });

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .populate('items.food', 'name price')
      .sort({ createdAt: -1 })
      .limit(5);

    // Order status distribution
    const orderStatusStats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Popular food items
    const popularFoods = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.food',
          totalOrdered: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },
      {
        $lookup: {
          from: 'foods',
          localField: '_id',
          foreignField: '_id',
          as: 'foodDetails'
        }
      },
      { $unwind: '$foodDetails' },
      {
        $project: {
          name: '$foodDetails.name',
          image: '$foodDetails.image',
          totalOrdered: 1,
          totalRevenue: 1
        }
      },
      { $sort: { totalOrdered: -1 } },
      { $limit: 5 }
    ]);

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          status: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      todayStats: {
        orders: todayOrders,
        revenue: todayRevenue[0]?.totalRevenue || 0
      },
      totalStats: {
        orders: totalOrders,
        users: totalUsers,
        foodItems: totalFoodItems,
        employees: totalEmployees
      },
      recentOrders,
      orderStatusStats,
      popularFoods,
      monthlyRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (customers)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const users = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments({ role: 'customer' });

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sales report
router.get('/sales-report', adminAuth, async (req, res) => {
  try {
    const { startDate, endDate, period = 'daily' } = req.query;

    let matchStage = { status: { $ne: 'cancelled' } };
    
    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    let groupStage;
    switch (period) {
      case 'daily':
        groupStage = {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        };
        break;
      case 'monthly':
        groupStage = {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        };
        break;
      case 'yearly':
        groupStage = {
          _id: { year: { $year: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        };
        break;
    }

    const salesData = await Order.aggregate([
      { $match: matchStage },
      { $group: groupStage },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Food performance report
router.get('/food-performance', adminAuth, async (req, res) => {
  try {
    const foodPerformance = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.food',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
          orderCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'foods',
          localField: '_id',
          foreignField: '_id',
          as: 'foodDetails'
        }
      },
      { $unwind: '$foodDetails' },
      {
        $lookup: {
          from: 'categories',
          localField: 'foodDetails.category',
          foreignField: '_id',
          as: 'categoryDetails'
        }
      },
      { $unwind: '$categoryDetails' },
      {
        $project: {
          name: '$foodDetails.name',
          category: '$categoryDetails.name',
          price: '$foodDetails.price',
          totalQuantity: 1,
          totalRevenue: 1,
          orderCount: 1,
          avgQuantityPerOrder: { $divide: ['$totalQuantity', '$orderCount'] }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.json(foodPerformance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;