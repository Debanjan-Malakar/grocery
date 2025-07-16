const fs = require('fs');
const path = require('path');

console.log('📱 Setting up Frontend Configuration...\n');

// Create a web version of the React Native app for demo
const webAppContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GroGo - Grocery Delivery</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f01f1f, #ff6b6b);
            min-height: 100vh;
        }
        
        .container {
            max-width: 400px;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
            position: relative;
        }
        
        .header {
            background: #f01f1f;
            color: white;
            padding: 20px;
            border-radius: 0 0 30px 30px;
        }
        
        .delivery-info h2 {
            font-size: 24px;
            margin-bottom: 5px;
        }
        
        .delivery-time {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .search-bar {
            background: white;
            margin: 15px 10px;
            padding: 12px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .search-bar input {
            border: none;
            outline: none;
            flex: 1;
            margin-left: 10px;
            font-size: 16px;
        }
        
        .categories {
            padding: 20px;
        }
        
        .categories h3 {
            margin-bottom: 15px;
            color: #333;
        }
        
        .category-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
        }
        
        .category-item {
            text-align: center;
            padding: 15px;
            background: #afeded;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .category-item:hover {
            transform: translateY(-2px);
        }
        
        .category-item img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 8px;
        }
        
        .category-item span {
            display: block;
            font-weight: bold;
            font-size: 12px;
            color: #333;
        }
        
        .login-section {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .login-form {
            background: white;
            padding: 30px;
            border-radius: 15px;
            width: 90%;
            max-width: 350px;
        }
        
        .login-form h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }
        
        .login-form input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
        }
        
        .login-btn {
            width: 100%;
            padding: 12px;
            background: #0d9903;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
        }
        
        .login-btn:hover {
            background: #0a7a02;
        }
        
        .profile-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            cursor: pointer;
        }
        
        .status {
            text-align: center;
            padding: 20px;
            margin: 20px;
            background: #e8f5e8;
            border-radius: 10px;
            color: #2d5a2d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <button class="profile-btn" onclick="showLogin()">👤 Login</button>
            <div class="delivery-info">
                <p>DELIVERY IN</p>
                <div class="delivery-time">13 minutes</div>
                <p>Demo Location, WebContainer</p>
            </div>
            <div class="search-bar">
                <span>🔍</span>
                <input type="text" placeholder="Search in 'groceries'" />
                <span>🎤</span>
            </div>
        </div>
        
        <div class="categories">
            <h3>Shop by Category</h3>
            <div class="category-grid" id="categories">
                <!-- Categories will be loaded here -->
            </div>
        </div>
        
        <div class="status" id="status">
            🚀 Backend Status: <span id="backend-status">Checking...</span>
        </div>
    </div>
    
    <div class="login-section" id="loginSection">
        <div class="login-form">
            <h2>Login to GroGo</h2>
            <input type="email" id="email" placeholder="Enter your email" value="demo@test.com" />
            <input type="password" id="password" placeholder="Enter your password" value="password123" />
            <button class="login-btn" onclick="handleLogin()">Continue</button>
            <button class="login-btn" onclick="hideLogin()" style="background: #ccc; color: #333; margin-top: 10px;">Cancel</button>
        </div>
    </div>

    <script>
        // Check backend status
        async function checkBackend() {
            try {
                const response = await fetch('http://localhost:8000/customer/whoami');
                const data = await response.json();
                document.getElementById('backend-status').textContent = '✅ Connected';
                document.getElementById('status').style.background = '#e8f5e8';
                loadCategories();
            } catch (error) {
                document.getElementById('backend-status').textContent = '❌ Backend not running';
                document.getElementById('status').style.background = '#ffe8e8';
                document.getElementById('status').style.color = '#8b0000';
            }
        }
        
        // Load categories from backend
        async function loadCategories() {
            try {
                const response = await fetch('http://localhost:8000/product/get/categories');
                const categories = await response.json();
                
                const categoriesContainer = document.getElementById('categories');
                categoriesContainer.innerHTML = categories.map(cat => \`
                    <div class="category-item" onclick="viewCategory('\${cat.CategoryName}')">
                        <img src="\${cat.CategoryImage.image_url}" alt="\${cat.CategoryName}" />
                        <span>\${cat.CategoryName}</span>
                    </div>
                \`).join('');
            } catch (error) {
                console.error('Failed to load categories:', error);
            }
        }
        
        function viewCategory(categoryName) {
            alert(\`Viewing category: \${categoryName}\\n\\nIn the full React Native app, this would navigate to the category products page.\`);
        }
        
        function showLogin() {
            document.getElementById('loginSection').style.display = 'flex';
        }
        
        function hideLogin() {
            document.getElementById('loginSection').style.display = 'none';
        }
        
        async function handleLogin() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('http://localhost:8000/customer/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const result = await response.json();
                
                if (result.token) {
                    alert('Login successful! 🎉\\n\\nIn the full React Native app, you would now be logged in and can browse products, add to cart, and place orders.');
                    hideLogin();
                } else {
                    alert('Login failed: ' + (result.message || 'Unknown error'));
                }
            } catch (error) {
                alert('Login error: ' + error.message);
            }
        }
        
        // Initialize
        checkBackend();
    </script>
</body>
</html>
`;

fs.writeFileSync('demo-app.html', webAppContent);

console.log('✅ Created web demo app: demo-app.html');
console.log('\n📋 Frontend setup complete!');
console.log('\n🌐 To view the demo:');
console.log('1. Start the backend gateway first');
console.log('2. Open demo-app.html in your browser');
console.log('\n📱 For the full React Native app:');
console.log('1. You would need React Native development environment');
console.log('2. Android Studio or Xcode');
console.log('3. The Frontend_app folder contains the complete React Native code');