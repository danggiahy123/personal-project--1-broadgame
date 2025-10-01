import Link from 'next/link'

export default function AdminHome() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        BroadGame Admin Panel
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Quản lý hệ thống game và người dùng
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-lg font-semibold mb-2">Quản lý Users</h3>
            <p className="text-gray-600">Xem và quản lý người dùng</p>
          </div>
        </Link>
        
        <Link href="/admin/games" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">🎮</div>
            <h3 className="text-lg font-semibold mb-2">Quản lý Games</h3>
            <p className="text-gray-600">Thêm và chỉnh sửa games</p>
          </div>
        </Link>
        
        <Link href="/admin/scores" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-lg font-semibold mb-2">Điểm số</h3>
            <p className="text-gray-600">Xem thống kê điểm số</p>
          </div>
        </Link>
        
        <Link href="/admin/analytics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold mb-2">Phân tích</h3>
            <p className="text-gray-600">Báo cáo và thống kê</p>
          </div>
        </Link>
      </div>
      
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Thống kê nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-gray-600">Tổng Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">56</div>
            <div className="text-gray-600">Games</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">12,345</div>
            <div className="text-gray-600">Lượt chơi</div>
          </div>
        </div>
      </div>
    </div>
  )
}
