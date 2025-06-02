"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { scanAPI, systemAPI } from "@/utils/api"
import Link from "next/link"

interface ScanSummary {
  scan_id: string
  project_name: string
  scan_date: string
  scan_duration: string
  vulnerability_count: {
    critical: number
    high: number
    medium: number
    low: number
    info: number
    total: number
  }
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [recentScans, setRecentScans] = useState<ScanSummary[]>([])
  const [systemStatus, setSystemStatus] = useState({ status: "", version: "" })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // 获取系统状态
        const healthData = await systemAPI.healthCheck()
        setSystemStatus(healthData)

        // 这里应该有获取最近扫描的API，但示例中不完整，所以使用模拟数据
        // 实际项目中应该替换为真实API调用
        const mockRecentScans: ScanSummary[] = [
          {
            scan_id: "scan-001",
            project_name: "示例项目1",
            scan_date: "2025-05-30 14:30:00",
            scan_duration: "45.2秒",
            vulnerability_count: {
              critical: 1,
              high: 3,
              medium: 5,
              low: 2,
              info: 0,
              total: 11
            }
          },
          {
            scan_id: "scan-002",
            project_name: "示例项目2",
            scan_date: "2025-05-29 10:15:00",
            scan_duration: "32.7秒",
            vulnerability_count: {
              critical: 0,
              high: 2,
              medium: 3,
              low: 4,
              info: 1,
              total: 10
            }
          }
        ]

        setRecentScans(mockRecentScans)
      } catch (err) {
        console.error("获取仪表盘数据失败:", err)
        setError("获取数据失败，请刷新页面重试")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">仪表盘</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 状态卡片 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">系统状态</h2>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${systemStatus.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-gray-600 dark:text-gray-300">
              {systemStatus.status === 'ok' ? '正常运行中' : '系统异常'}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">版本: {systemStatus.version || '未知'}</p>
        </div>

        {/* 用户信息卡片 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">用户信息</h2>
          <p className="text-gray-600 dark:text-gray-300">用户名: {user?.username || '未知'}</p>
          <p className="text-gray-600 dark:text-gray-300">角色: {user?.role || '普通用户'}</p>
        </div>

        {/* 快速操作卡片 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">快速操作</h2>
          <div className="flex flex-col space-y-2">
            <Link href="/dashboard/projects/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center">
              新建项目
            </Link>
            {user?.role === 'admin' && (
              <Link href="/dashboard/admin" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-center">
                管理员控制台
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 最近的扫描 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">最近的扫描</h2>
        
        {isLoading ? (
          <p className="text-gray-600 dark:text-gray-300">加载中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : recentScans.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">暂无扫描记录</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">项目名称</th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">扫描时间</th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">持续时间</th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">漏洞总数</th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">严重程度</th>
                  <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">操作</th>
                </tr>
              </thead>
              <tbody>
                {recentScans.map((scan) => (
                  <tr key={scan.scan_id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{scan.project_name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{scan.scan_date}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{scan.scan_duration}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{scan.vulnerability_count.total}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        {scan.vulnerability_count.critical > 0 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            严重: {scan.vulnerability_count.critical}
                          </span>
                        )}
                        {scan.vulnerability_count.high > 0 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                            高危: {scan.vulnerability_count.high}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/dashboard/projects/${scan.scan_id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        查看详情
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
