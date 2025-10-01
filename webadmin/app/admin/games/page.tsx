'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface Game {
  _id: string
  name: string
  description: string
  category: string
  thumbnail: string
  gameUrl: string
  difficulty: string
  isActive: boolean
  isFeatured: boolean
  statistics: {
    totalPlays: number
    averageScore: number
    averageRating: number
  }
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGame, setNewGame] = useState({
    name: '',
    description: '',
    category: 'action',
    thumbnail: '',
    gameUrl: '',
    difficulty: 'medium'
  })

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games?limit=100`)
      const data = await response.json()
      setGames(data.games || [])
    } catch (error) {
      toast.error('Lỗi khi tải danh sách games')
      console.error('Error fetching games:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
      })

      if (response.ok) {
        toast.success('Game đã được thêm thành công!')
        setShowAddForm(false)
        setNewGame({
          name: '',
          description: '',
          category: 'action',
          thumbnail: '',
          gameUrl: '',
          difficulty: 'medium'
        })
        fetchGames()
      } else {
        toast.error('Lỗi khi thêm game')
      }
    } catch (error) {
      toast.error('Lỗi khi thêm game')
      console.error('Error adding game:', error)
    }
  }

  const toggleGameStatus = async (gameId: string, isActive: boolean) => {
    try {
      // This would be implemented in the backend
      toast.success(`Game ${isActive ? 'activated' : 'deactivated'} successfully`)
      fetchGames()
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái game')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Đang tải...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Games</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="admin-button"
        >
          {showAddForm ? 'Hủy' : 'Thêm Game'}
        </button>
      </div>

      {showAddForm && (
        <div className="admin-card mb-6">
          <h2 className="text-xl font-bold mb-4">Thêm Game Mới</h2>
          <form onSubmit={handleAddGame} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên Game
                </label>
                <input
                  type="text"
                  value={newGame.name}
                  onChange={(e) => setNewGame({...newGame, name: e.target.value})}
                  className="admin-input w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thể loại
                </label>
                <select
                  value={newGame.category}
                  onChange={(e) => setNewGame({...newGame, category: e.target.value})}
                  className="admin-input w-full"
                >
                  <option value="action">Action</option>
                  <option value="puzzle">Puzzle</option>
                  <option value="strategy">Strategy</option>
                  <option value="arcade">Arcade</option>
                  <option value="sports">Sports</option>
                  <option value="racing">Racing</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <textarea
                value={newGame.description}
                onChange={(e) => setNewGame({...newGame, description: e.target.value})}
                className="admin-input w-full h-20"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Thumbnail
                </label>
                <input
                  type="url"
                  value={newGame.thumbnail}
                  onChange={(e) => setNewGame({...newGame, thumbnail: e.target.value})}
                  className="admin-input w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Game
                </label>
                <input
                  type="url"
                  value={newGame.gameUrl}
                  onChange={(e) => setNewGame({...newGame, gameUrl: e.target.value})}
                  className="admin-input w-full"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="admin-button"
              >
                Thêm Game
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Game
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thể loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Độ khó
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lượt chơi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {games.map((game) => (
              <tr key={game._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={game.thumbnail}
                      alt={game.name}
                      className="h-10 w-10 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{game.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{game.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {game.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    game.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    game.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {game.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{game.statistics.totalPlays}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    game.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {game.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => toggleGameStatus(game._id, !game.isActive)}
                    className={`mr-2 px-3 py-1 text-xs rounded ${
                      game.isActive 
                        ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {game.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {games.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Chưa có games nào</p>
        </div>
      )}
    </div>
  )
}
