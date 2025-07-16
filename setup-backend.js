const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Grocery Delivery Backend...\n');

// Create backend directory structure
const backendDirs = [
  'backend_app/customer',
  'backend_app/products', 
  'backend_app/shopping',
  'backend_app/gateway'
];

backendDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Create environment files with default values
const envConfigs = {
  'backend_app/customer/.env': `
APP_SECRET=your_secret_key_change_this
MONGODB_URI=mongodb://localhost:27017/customer_db
PORT=8001
MSG_QUEUE_URL=amqp://localhost:5672
`,
  'backend_app/products/.env': `
APP_SECRET=your_secret_key_change_this
MONGODB_URI=mongodb://localhost:27017/products_db
PORT=8002
MSG_QUEUE_URL=amqp://localhost:5672
`,
  'backend_app/shopping/.env': `
APP_SECRET=your_secret_key_change_this
MONGODB_URI=mongodb://localhost:27017/shopping_db
PORT=8003
MSG_QUEUE_URL=amqp://localhost:5672
STRIPE_KEY=your_stripe_secret_key_here
`
};

Object.entries(envConfigs).forEach(([filePath, content]) => {
  fs.writeFileSync(filePath, content.trim());
  console.log(`✅ Created: ${filePath}`);
});

// Create a simplified gateway for WebContainer
const gatewayContent = `
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Mock endpoints for demo purposes
app.get('/customer/whoami', (req, res) => {
  res.json({ msg: "Customer Service - Running in WebContainer" });
});

app.get('/product/whoami', (req, res) => {
  res.json({ msg: "Products Service - Running in WebContainer" });
});

app.get('/shopping/whoami', (req, res) => {
  res.json({ msg: "Shopping Service - Running in WebContainer" });
});

// Mock product categories
app.get('/product/get/categories', (req, res) => {
  res.json([
    {
      _id: "1",
      CategoryName: "fruits & vegetables",
      CategoryImage: {
        image_url: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg"
      }
    },
    {
      _id: "2", 
      CategoryName: "dairy & breakfast",
      CategoryImage: {
        image_url: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg"
      }
    }
  ]);
});

// Mock products by category
app.get('/product/category/:category', (req, res) => {
  const mockProducts = [
    {
      _id: "1",
      name: "Fresh Apples",
      banner: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg",
      regular_price: 150,
      weight: "1kg",
      category: req.params.category
    },
    {
      _id: "2", 
      name: "Bananas",
      banner: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg",
      regular_price: 80,
      weight: "1kg", 
      category: req.params.category
    }
  ];
  res.json(mockProducts);
});

// Mock login endpoint
app.post('/customer/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      id: "user123",
      token: "mock_jwt_token_for_demo",
      isAdmin: false
    });
  } else {
    res.json({ message: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(\`🚀 Gateway Server running on http://localhost:\${PORT}\`);
  console.log('📱 This is a simplified version for WebContainer demo');
  console.log('🔗 Available endpoints:');
  console.log('   GET /customer/whoami');
  console.log('   GET /product/whoami'); 
  console.log('   GET /shopping/whoami');
  console.log('   GET /product/get/categories');
  console.log('   POST /customer/login');
});
`;

fs.writeFileSync('backend_app/gateway/index.js', gatewayContent);
fs.writeFileSync('backend_app/gateway/package.json', JSON.stringify({
  "name": "gateway",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1"
  }
}, null, 2));

console.log('✅ Created simplified gateway service');

console.log('\n🎉 Backend setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Run: cd backend_app/gateway && npm install');
console.log('2. Run: npm start');
console.log('3. The gateway will run on http://localhost:8000');
console.log('\n⚠️  Note: This is a simplified version for WebContainer demo');
console.log('   For full functionality, you would need:');
console.log('   - MongoDB database');
console.log('   - RabbitMQ message broker');
console.log('   - Stripe payment integration');