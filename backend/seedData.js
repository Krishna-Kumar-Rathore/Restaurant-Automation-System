// backend/seedData.js (Updated - Sample Orders with Confirmed Status)
const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Food = require('./models/Food');
const Employee = require('./models/Employee');
const Order = require('./models/Order');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Food.deleteMany({});
    await Employee.deleteMany({});
    await Order.deleteMany({});

    // Create admin user (plain text password)
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@restaurant.com',
      password: 'admin123', // Plain text password
      phone: '9876543210',
      address: '123 Admin Street, City',
      role: 'admin'
    });

    // Create sample customer (plain text password)
    const customer = await User.create({
      name: 'John Doe',
      email: 'customer@test.com',
      password: 'customer123', // Plain text password
      phone: '9876543211',
      address: '456 Customer Lane, City',
      role: 'customer'
    });

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Starters', description: 'Appetizers and small plates' },
      { name: 'Main Course', description: 'Full meals and entrees' },
      { name: 'Biryani', description: 'Aromatic rice dishes' },
      { name: 'Pizza', description: 'Italian style pizzas' },
      { name: 'Burgers', description: 'Juicy burgers and sandwiches' },
      { name: 'Desserts', description: 'Sweet treats and desserts' },
      { name: 'Cold Drinks', description: 'Refreshing beverages' },
      { name: 'Chinese', description: 'Oriental cuisine' }
    ]);

    // Create sample food items
    const foods = await Food.insertMany([
      {
        name: 'Chicken Tikka',
        description: 'Tender pieces of chicken marinated in yogurt and spices, grilled to perfection',
        price: 299,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
        category: categories[0]._id,
        ingredients: ['Chicken', 'Yogurt', 'Spices', 'Lemon'],
        isVegetarian: false,
        preparationTime: 20
      },
      {
        name: 'Paneer Butter Masala',
        description: 'Rich and creamy curry with paneer cubes in tomato-based gravy',
        price: 249,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
        category: categories[1]._id,
        ingredients: ['Paneer', 'Tomatoes', 'Cream', 'Spices'],
        isVegetarian: true,
        preparationTime: 15
      },
      {
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice cooked with tender chicken and exotic spices',
        price: 399,
        image: 'https://images.unsplash.com/photo-1563379091339-03246968d3d6?w=400',
        category: categories[2]._id,
        ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Spices'],
        isVegetarian: false,
        preparationTime: 45
      },
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, tomatoes and basil',
        price: 349,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
        category: categories[3]._id,
        ingredients: ['Pizza Dough', 'Mozzarella', 'Tomatoes', 'Basil'],
        isVegetarian: true,
        preparationTime: 25
      },
      {
        name: 'Chicken Burger',
        description: 'Juicy grilled chicken patty with lettuce, tomato and mayo',
        price: 199,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        category: categories[4]._id,
        ingredients: ['Chicken Patty', 'Bun', 'Lettuce', 'Tomato', 'Mayo'],
        isVegetarian: false,
        preparationTime: 15
      },
      {
        name: 'Chocolate Brownie',
        description: 'Rich and fudgy chocolate brownie served warm',
        price: 149,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
        category: categories[5]._id,
        ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Flour'],
        isVegetarian: true,
        preparationTime: 10
      },
      {
        name: 'Fresh Lime Soda',
        description: 'Refreshing lime soda with a perfect blend of sweet and tangy',
        price: 79,
        image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400',
        category: categories[6]._id,
        ingredients: ['Fresh Lime', 'Soda Water', 'Sugar', 'Salt'],
        isVegetarian: true,
        preparationTime: 5
      },
      {
        name: 'Hakka Noodles',
        description: 'Stir-fried noodles with vegetables and Chinese seasonings',
        price: 179,
        image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400',
        category: categories[7]._id,
        ingredients: ['Noodles', 'Vegetables', 'Soy Sauce', 'Garlic'],
        isVegetarian: true,
        preparationTime: 20
      }
    ]);

    // Create employees
    const employees = await Employee.insertMany([
      {
        name: 'Ravi Kumar',
        role: 'chef',
        phone: '9876543212',
        email: 'ravi.chef@restaurant.com',
        salary: 35000,
        shift: 'morning'
      },
      {
        name: 'Priya Sharma',
        role: 'waiter',
        phone: '9876543213',
        email: 'priya.waiter@restaurant.com',
        salary: 18000,
        shift: 'evening'
      },
      {
        name: 'Amit Singh',
        role: 'manager',
        phone: '9876543214',
        email: 'amit.manager@restaurant.com',
        salary: 50000,
        shift: 'morning'
      },
      {
        name: 'Deepak Yadav',
        role: 'delivery_boy',
        phone: '9876543215',
        email: 'deepak.delivery@restaurant.com',
        salary: 15000,
        shift: 'evening'
      }
    ]);

    // Create sample orders with confirmed status
    const sampleOrders = await Order.insertMany([
      {
        user: customer._id,
        items: [
          {
            food: foods[0]._id, // Chicken Tikka
            quantity: 2,
            price: 299
          },
          {
            food: foods[2]._id, // Chicken Biryani
            quantity: 1,
            price: 399
          }
        ],
        totalAmount: 997,
        status: 'confirmed', // Default to confirmed
        paymentStatus: 'completed',
        paymentMethod: 'card',
        deliveryAddress: customer.address,
        customerPhone: customer.phone,
        estimatedDeliveryTime: new Date(Date.now() + 35 * 60 * 1000)
      },
      {
        user: customer._id,
        items: [
          {
            food: foods[1]._id, // Paneer Butter Masala
            quantity: 1,
            price: 249
          },
          {
            food: foods[6]._id, // Fresh Lime Soda
            quantity: 2,
            price: 79
          }
        ],
        totalAmount: 407,
        status: 'confirmed', // Default to confirmed
        paymentStatus: 'completed',
        paymentMethod: 'upi',
        deliveryAddress: customer.address,
        customerPhone: customer.phone,
        estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      }
    ]);

    console.log('Sample data seeded successfully!');
    console.log(`Created ${categories.length} categories`);
    console.log(`Created ${foods.length} food items`);
    console.log(`Created ${employees.length} employees`);
    console.log(`Created ${sampleOrders.length} sample orders (all confirmed)`);
    console.log('Admin credentials: admin@restaurant.com / admin123');
    console.log('Customer credentials: customer@test.com / customer123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to MongoDB and run seed
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected for seeding');
  seedData();
})
.catch(err => console.log('MongoDB connection error:', err));