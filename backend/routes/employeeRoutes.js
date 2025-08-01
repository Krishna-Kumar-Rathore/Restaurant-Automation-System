const express = require('express');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all employees
router.get('/', adminAuth, async (req, res) => {
  try {
    const { role, isActive, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const employees = await Employee.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Employee.countDocuments(query);

    res.json({
      employees,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee by ID
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create employee
router.post('/', adminAuth, [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('role').isIn(['chef', 'waiter', 'manager', 'cashier', 'delivery_boy', 'cleaner']).withMessage('Invalid role'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('salary').isNumeric().withMessage('Salary must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, role, phone, email, salary, shift } = req.body;

    // Check if employee with same email or phone exists
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingEmployee) {
      return res.status(400).json({ 
        message: 'Employee with this email or phone already exists' 
      });
    }

    const employee = new Employee({
      name,
      role,
      phone,
      email,
      salary,
      shift: shift || 'morning'
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update employee
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, role, phone, email, salary, shift, isActive } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, role, phone, email, salary, shift, isActive },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete employee (soft delete)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employees by role
router.get('/role/:role', adminAuth, async (req, res) => {
  try {
    const employees = await Employee.find({ 
      role: req.params.role,
      isActive: true 
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;