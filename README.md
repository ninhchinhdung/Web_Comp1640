# Express MVC Project

Một project Express.js được xây dựng theo mô hình MVC (Model-View-Controller) với EJS template engine.

## 📋 Mô Tả

Project này là một ứng dụng web đơn giản sử dụng Express.js framework, được tổ chức theo kiến trúc MVC để quản lý người dùng (User). Đây là một template hoàn chỉnh có thể được sử dụng làm nền tảng cho các dự án lớn hơn.

## 🚀 Tính Năng

- ✅ Kiến trúc MVC rõ ràng và dễ mở rộng
- ✅ CRUD đầy đủ cho User resource
- ✅ RESTful routing
- ✅ EJS template engine với layout system
- ✅ Responsive design với CSS hiện đại
- ✅ Form validation (client-side)
- ✅ Error handling (404, 500)
- ✅ Environment variables với dotenv

## 📁 Cấu Trúc Thư Mục

```
Web_Comp1640/
├── models/              # Data models
│   └── User.js         # User model với CRUD operations
├── views/              # EJS templates
│   ├── users/         # User-related views
│   │   ├── index.ejs  # Danh sách users
│   │   ├── show.ejs   # Chi tiết user
│   │   ├── create.ejs # Form tạo user
│   │   └── edit.ejs   # Form sửa user
│   ├── home.ejs       # Trang chủ
│   ├── layout.ejs     # Layout chung
│   ├── 404.ejs        # Trang lỗi 404
│   └── error.ejs      # Trang lỗi 500
├── controllers/        # Request handlers
│   ├── homeController.js
│   └── userController.js
├── routes/            # Route definitions
│   ├── index.js       # Main router
│   ├── homeRoutes.js
│   └── userRoutes.js
├── public/            # Static assets
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── app.js             # Express app configuration
├── server.js          # Server entry point
├── package.json       # Dependencies
├── .env              # Environment variables
└── .gitignore        # Git ignore rules
```

## 🛠️ Cài Đặt

### Yêu Cầu

- Node.js (v14 trở lên)
- npm hoặc yarn

### Các Bước Cài Đặt

1. **Clone repository hoặc tải về project**

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Cấu hình environment variables:**
   
   File `.env` đã được tạo sẵn với cấu hình mặc định:
   ```
   PORT=3000
   NODE_ENV=development
   ```

4. **Chạy server:**
   
   Development mode (với nodemon - auto-restart):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

5. **Truy cập ứng dụng:**
   
   Mở trình duyệt và truy cập: `http://localhost:3000`

## 📚 API Routes

### Home Routes
- `GET /` - Trang chủ

### User Routes
- `GET /users` - Danh sách tất cả users
- `GET /users/create` - Form tạo user mới
- `POST /users` - Tạo user mới
- `GET /users/:id` - Chi tiết một user
- `GET /users/:id/edit` - Form chỉnh sửa user
- `POST /users/:id` - Cập nhật user
- `POST /users/:id/delete` - Xóa user

## 🎨 Công Nghệ Sử Dụng

- **Express.js** - Web framework
- **EJS** - Template engine
- **Body-parser** - Parse request body
- **Dotenv** - Environment variables management
- **Nodemon** - Development auto-restart (dev dependency)

## 💡 Hướng Dẫn Sử Dụng

### Tạo Model Mới

1. Tạo file trong thư mục `models/`
2. Định nghĩa class với các phương thức CRUD
3. Export model

### Tạo Controller Mới

1. Tạo file trong thư mục `controllers/`
2. Import model cần thiết
3. Định nghĩa các action functions
4. Export controller

### Tạo Routes Mới

1. Tạo file trong thư mục `routes/`
2. Import controller
3. Định nghĩa routes
4. Import và mount trong `routes/index.js`

### Tạo Views Mới

1. Tạo file `.ejs` trong thư mục `views/`
2. Sử dụng EJS syntax để render dynamic content
3. Include layout nếu cần

## 🔧 Tùy Chỉnh

### Thay Đổi Port

Chỉnh sửa file `.env`:
```
PORT=8080
```

### Thêm Database

Hiện tại project sử dụng in-memory data. Để kết nối database thực:

1. Cài đặt database driver (MongoDB, MySQL, PostgreSQL, etc.)
2. Cập nhật models để kết nối với database
3. Thêm connection string vào `.env`

## 📝 Ghi Chú

- Data hiện tại được lưu trong memory, sẽ mất khi restart server
- Để production, nên kết nối với database thực
- Có thể thêm authentication/authorization cho bảo mật
- Có thể thêm validation middleware cho server-side validation

## 📄 License

ISC

## 👨‍💻 Tác Giả

Express MVC Project Template