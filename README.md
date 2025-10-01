# BroadGame - Ứng dụng bán Board Game

Ứng dụng bán board game với đầy đủ tính năng CRUD (Create, Read, Update, Delete) sản phẩm.

## 🚀 Tính năng chính

### Backend (Node.js + Express + MongoDB)
- ✅ API CRUD đầy đủ cho sản phẩm
- ✅ Tìm kiếm và lọc sản phẩm
- ✅ Phân trang (pagination)
- ✅ Thống kê sản phẩm
- ✅ Upload hình ảnh
- ✅ Authentication & Authorization
- ✅ Socket.io cho real-time features

### Frontend (React + TypeScript)
- ✅ Trang Shop với tìm kiếm và lọc
- ✅ Hiển thị sản phẩm Flash Sale
- ✅ Sản phẩm nổi bật
- ✅ Pagination
- ✅ Responsive design
- ✅ Rating system

### Admin Panel (Next.js + Tailwind CSS)
- ✅ Quản lý sản phẩm (thêm, sửa, xóa)
- ✅ Thống kê dashboard
- ✅ Tìm kiếm và lọc
- ✅ Pagination
- ✅ Form validation

## 📁 Cấu trúc dự án

```
broadgame/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Middleware functions
│   │   └── server.js       # Main server file
│   ├── package.json
│   └── Dockerfile
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── Dockerfile
├── webadmin/               # Admin panel
│   ├── app/
│   │   ├── admin/          # Admin pages
│   │   └── layout.tsx      # Layout component
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml      # Docker orchestration
```

## 🛠️ Cài đặt và chạy

### 1. Clone repository
```bash
git clone <repository-url>
cd broadgame
```

### 2. Cài đặt dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

#### Admin Panel
```bash
cd webadmin
npm install
```

### 3. Cấu hình environment

Tạo file `.env` trong thư mục `backend`:
```env
MONGODB_URI=mongodb://localhost:27017/broadgame
PORT=3001
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
```

### 4. Chạy ứng dụng

#### Sử dụng Docker (Khuyến nghị)
```bash
docker-compose up -d
```

#### Chạy thủ công

1. **MongoDB**: Đảm bảo MongoDB đang chạy
2. **Backend**:
   ```bash
   cd backend
   npm run dev
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm start
   ```
4. **Admin Panel**:
   ```bash
   cd webadmin
   npm run dev
   ```

### 5. Seed dữ liệu mẫu
```bash
cd backend
npm run seed
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Admin Panel**: http://localhost:3002

## 📚 API Endpoints

### Products
- `GET /api/products` - Lấy danh sách sản phẩm (có phân trang, tìm kiếm, lọc)
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới (Admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin)
- `GET /api/products/flash-sale` - Lấy sản phẩm Flash Sale
- `GET /api/products/featured` - Lấy sản phẩm nổi bật
- `GET /api/products/categories` - Lấy danh sách danh mục
- `GET /api/products/brands` - Lấy danh sách thương hiệu
- `GET /api/products/stats` - Lấy thống kê sản phẩm (Admin)

### Query Parameters
- `page` - Trang hiện tại (mặc định: 1)
- `limit` - Số sản phẩm mỗi trang (mặc định: 12)
- `category` - Lọc theo danh mục
- `search` - Tìm kiếm theo tên, mô tả, thương hiệu
- `minPrice`, `maxPrice` - Lọc theo khoảng giá
- `sortBy` - Sắp xếp theo (createdAt, price, name, ratings.average)
- `sortOrder` - Thứ tự sắp xếp (asc, desc)

## 🎨 Tính năng UI/UX

### Frontend Shop
- Tìm kiếm sản phẩm theo tên, mô tả, thương hiệu
- Lọc theo danh mục
- Sắp xếp theo giá, tên, đánh giá, ngày tạo
- Hiển thị sản phẩm Flash Sale với carousel
- Sản phẩm nổi bật
- Pagination
- Rating system với sao
- Responsive design

### Admin Panel
- Dashboard với thống kê
- Bảng quản lý sản phẩm
- Form thêm/sửa sản phẩm
- Tìm kiếm và lọc
- Pagination
- Toast notifications

## 🔧 Công nghệ sử dụng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Express Validator** - Input validation
- **Multer** - File upload

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS3** - Styling
- **Fetch API** - HTTP requests

### Admin Panel
- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first CSS
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

## 📱 Responsive Design

Ứng dụng được thiết kế responsive cho:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Deployment

### Docker
```bash
docker-compose up -d
```

### Manual Deployment
1. Build frontend: `npm run build`
2. Build admin: `npm run build`
3. Start backend: `npm start`
4. Serve static files với nginx hoặc Apache

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License

## 📞 Support

Nếu có vấn đề gì, vui lòng tạo issue trên GitHub repository.