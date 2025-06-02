"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import axios from "axios"

interface User {
  id: string
  username: string
  email: string
  role: string
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [configSettings, setConfigSettings] = useState({
    auth_mode: 'login',
    database: {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'auditluma'
    },
    redis: {
      host: 'localhost',
      port: 6379,
      password: '',
      db: 0
    }
  })

  // u68c0u67e5u662fu5426u662fu7ba1u7406u5458
  useEffect(() => {
    if (isAuthenticated && user?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  // u83b7u53d6u7528u6237u5217u8868u548cu914du7f6eu4fe1u606f
  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // u83b7u53d6u914du7f6e
        const configResponse = await fetch('/api/config')
        const configData = await configResponse.json()
        setConfigSettings(configData)

        // u83b7u53d6u7528u6237u5217u8868
        // u5b9eu9645u9879u76eeu4e2du5e94u8be5u4f7fu7528u771fu5b9eAPI
        // const usersResponse = await axios.get('/api/admin/users')
        // setUsers(usersResponse.data)

        // u4f7fu7528u6a21u62dfu6570u636e
        const mockUsers: User[] = [
          {
            id: 'user-001',
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin',
            created_at: '2025-05-01 10:00:00'
          },
          {
            id: 'user-002',
            username: 'user1',
            email: 'user1@example.com',
            role: 'user',
            created_at: '2025-05-15 14:30:00'
          },
          {
            id: 'user-003',
            username: 'user2',
            email: 'user2@example.com',
            role: 'user',
            created_at: '2025-05-20 09:15:00'
          }
        ]
        setUsers(mockUsers)
      } catch (err) {
        console.error('u83b7u53d6u7ba1u7406u5458u6570u636eu5931u8d25:', err)
        setError('u83b7u53d6u6570u636eu5931u8d25uff0cu8bf7u5237u65b0u9875u9762u91cdu8bd5')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  // u4fddu5b58u914du7f6e
  const handleSaveConfig = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // u5b9eu9645u9879u76eeu4e2du5e94u8be5u4f7fu7528u771fu5b9eAPI
      // await axios.post('/api/admin/config', configSettings)
      alert('u914du7f6eu5df2u4fddu5b58uff01(u6a21u62df)')
    } catch (err) {
      console.error('u4fddu5b58u914du7f6eu5931u8d25:', err)
      setError('u4fddu5b58u914du7f6eu5931u8d25uff0cu8bf7u91cdu8bd5')
    } finally {
      setIsLoading(false)
    }
  }

  // u66f4u65b0u914du7f6eu5b57u6bb5
  const handleConfigChange = (section: string, field: string, value: any) => {
    setConfigSettings(prev => ({
      ...prev,
      [section]: section === 'auth_mode' ? value : {
        ...prev[section as keyof typeof prev] as Record<string, any>,
        [field]: value
      }
    }))
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">u7ba1u7406u5458u63a7u5236u53f0</h1>

      {isLoading ? (
        <p className="text-gray-600 dark:text-gray-300">u52a0u8f7du4e2d...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-8">
          {/* u7cfbu7edfu914du7f6e */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">u7cfbu7edfu914du7f6e</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">u8ba4u8bc1u6a21u5f0f</h3>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="auth_mode"
                    value="login"
                    checked={configSettings.auth_mode === 'login'}
                    onChange={() => handleConfigChange('auth_mode', '', 'login')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">u767bu5f55u6a21u5f0f</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="auth_mode"
                    value="noauth"
                    checked={configSettings.auth_mode === 'noauth'}
                    onChange={() => handleConfigChange('auth_mode', '', 'noauth')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">u975eu767bu5f55u6a21u5f0f</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                u975eu767bu5f55u6a21u5f0fu4e0buff0cu7cfbu7edfu4f7fu7528u9ed8u8ba4u8d26u53f7 admin/adminuff0cu65e0u9700u6570u636eu5e93
              </p>
            </div>

            {configSettings.auth_mode === 'login' && (
              <>
                {/* u6570u636eu5e93u914du7f6e */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">u6570u636eu5e93u914du7f6e</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u4e3bu673a</label>
                      <input
                        type="text"
                        value={configSettings.database.host}
                        onChange={(e) => handleConfigChange('database', 'host', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u7aefu53e3</label>
                      <input
                        type="number"
                        value={configSettings.database.port}
                        onChange={(e) => handleConfigChange('database', 'port', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u7528u6237u540d</label>
                      <input
                        type="text"
                        value={configSettings.database.username}
                        onChange={(e) => handleConfigChange('database', 'username', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u5bc6u7801</label>
                      <input
                        type="password"
                        value={configSettings.database.password}
                        onChange={(e) => handleConfigChange('database', 'password', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u6570u636eu5e93u540d</label>
                      <input
                        type="text"
                        value={configSettings.database.database}
                        onChange={(e) => handleConfigChange('database', 'database', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Redisu914du7f6e */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">Redisu914du7f6e</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u4e3bu673a</label>
                      <input
                        type="text"
                        value={configSettings.redis.host}
                        onChange={(e) => handleConfigChange('redis', 'host', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u7aefu53e3</label>
                      <input
                        type="number"
                        value={configSettings.redis.port}
                        onChange={(e) => handleConfigChange('redis', 'port', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u5bc6u7801</label>
                      <input
                        type="password"
                        value={configSettings.redis.password}
                        onChange={(e) => handleConfigChange('redis', 'password', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">u6570u636eu5e93</label>
                      <input
                        type="number"
                        value={configSettings.redis.db}
                        onChange={(e) => handleConfigChange('redis', 'db', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="mt-4">
              <Button 
                onClick={handleSaveConfig}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'u4fddu5b58u4e2d...' : 'u4fddu5b58u914du7f6e'}
              </Button>
            </div>
          </div>

          {/* u7528u6237u7ba1u7406 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">u7528u6237u7ba1u7406</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">ID</th>
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">u7528u6237u540d</th>
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">u90aeu7bb1</th>
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">u89d2u8272</th>
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">u521bu5efau65f6u95f4</th>
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">u64cdu4f5c</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.id}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.username}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.role}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.created_at}</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mr-2"
                          onClick={() => alert(`u7f16u8f91u7528u6237 ${user.username} (u6a21u62df)`)}
                        >
                          u7f16u8f91
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => alert(`u5220u9664u7528u6237 ${user.username} (u6a21u62df)`)}
                        >
                          u5220u9664
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <Button 
                onClick={() => alert('u6dfbu52a0u7528u6237u529fu80fd (u6a21u62df)')}
                className="bg-green-600 hover:bg-green-700"
              >
                u6dfbu52a0u7528u6237
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
