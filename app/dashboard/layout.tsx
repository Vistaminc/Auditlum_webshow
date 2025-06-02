"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const { isAuthenticated, user, logout, checkAuthStatus } = useAuthStore()

  // 检查认证状态
  useEffect(() => {
    checkAuthStatus()
  }, [])

  // 如果未认证，重定向到登录页
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // 处理登出
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // 如果还在检查认证状态，显示加载中
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">正在加载...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 侧边栏 */}
      <div className="w-64 bg-white shadow-md dark:bg-gray-800 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">AuditLuma</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">代码审计工具</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
              仪表盘
            </Link>
            <Link href="/dashboard/projects" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
              项目管理
            </Link>
            <Link href="/dashboard/settings/site-config" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
              系统设置
            </Link>
            {user?.role === 'admin' && (
              <Link href="/dashboard/admin" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                管理员控制台
              </Link>
            )}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{user?.username || '用户'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || '用户'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单按钮 */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">AuditLuma</h2>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 md:ml-64 pt-4 md:pt-0">
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
