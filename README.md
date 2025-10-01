# BroadGame Project

Dự án game với Frontend, Backend và Web Admin Panel.

## Cấu trúc dự án

```
broadgame/
├── frontend/          # Frontend Application
├── backend/           # API Backend (Node.js/Express)
├── webadmin/          # Admin Panel (Next.js + Tailwind CSS)
└── README.md
```

## Cài đặt và chạy

### 1. Backend (Port 3001)

```bash
cd backend
npm install
cp env.example .env
# Chỉnh sửa file .env với thông tin của bạn
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

### 3. Web Admin (Port 3002)

```bash
cd webadmin
npm install
npm run dev
```

## Tính năng

### Frontend
- 🎮 Trang chủ với danh sách games
- 👤 Đăng ký/Đăng nhập người dùng
- 🏆 Bảng xếp hạng
- 🔄 Real-time updates
- 📊 Thống kê cá nhân

### Backend
- 🔐 Authentication với JWT
- 👥 Quản lý người dùng
- 🎮 Quản lý games
- 🏆 Hệ thống điểm số
- 🔌 WebSocket cho real-time

### Web Admin
- 📊 Dashboard tổng quan
- 👥 Quản lý users
- 🎮 Quản lý games
- 📈 Thống kê và báo cáo

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Users
- `GET /api/users/profile` - Lấy thông tin profile
- `PUT /api/users/profile` - Cập nhật profile
- `GET /api/users/leaderboard` - Bảng xếp hạng

### Games
- `GET /api/games` - Lấy danh sách games
- `GET /api/games/:id` - Lấy thông tin game
- `POST /api/games` - Tạo game mới (admin)

### Scores
- `POST /api/scores` - Nộp điểm
- `GET /api/scores/my-scores` - Điểm của user
- `GET /api/scores/game/:gameId` - Bảng xếp hạng game

## Công nghệ sử dụng

### Frontend
- React
- TypeScript
- Axios

### Web Admin
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Socket.io
- bcryptjs

## Môi trường phát triển

- Node.js >= 18
- MongoDB
- npm hoặc yarn

## Liên hệ

BroadGame Team
"# personal-project--1-broadgame" 
