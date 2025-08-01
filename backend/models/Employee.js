const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['chef', 'waiter', 'manager', 'cashier', 'delivery_boy', 'cleaner']
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  shift: {
    type: String,
    enum: ['morning', 'evening', 'night'],
    default: 'morning'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);