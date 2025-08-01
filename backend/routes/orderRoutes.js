// routes/orderRoutes.js (Updated - Default to Confirmed Status)
const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Create order from cart
router.post('/create', auth, async (req, res) => {
  try {
    const { paymentMethod, deliveryAddress, customerPhone, notes } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.food');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Check if all items are available
    for (let item of cart.items) {
      if (!item.food.isAvailable) {
        return res.status(400).json({ 
          message: `${item.food.name} is not available` 
        });
      }
    }

    // Calculate estimated delivery time (30-45 minutes)
    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 35);

    const order = new Order({
      user: req.user._id,
      items: cart.items.map(item => ({
        food: item.food._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: cart.totalAmount,
      status: 'confirmed', // Changed from 'pending' to 'confirmed'
      paymentMethod,
      deliveryAddress: deliveryAddress || req.user.address,
      customerPhone: customerPhone || req.user.phone,
      notes,
      estimatedDeliveryTime
    });

    await order.save();
    await order.populate('items.food', 'name price image');

    // Clear cart after successful order
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ user: req.user._id })
      .populate('items.food', 'name price image')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments({ user: req.user._id });

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.food', 'name price image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel order (only if confirmed and within 5 minutes)
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'confirmed') { // Changed from 'pending' to 'confirmed'
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }

    // Check if order is within 5 minutes
    const timeDiff = new Date() - order.createdAt;
    if (timeDiff > 5 * 60 * 1000) {
      return res.status(400).json({ message: 'Order cancellation time expired' });
    }

    order.status = 'cancelled';
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all orders
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .populate('items.food', 'name price')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update order status (keeping this but UI will hide most options)
router.put('/admin/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email phone')
     .populate('items.food', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update payment status
router.put('/admin/:id/payment', adminAuth, async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    const validPaymentStatuses = ['pending', 'completed', 'failed'];
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;