"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { systemAPI } from "@/utils/api"

interface SystemSettings {
  api_settings: {
    webadmin_url: string
    fastapi_url: string
    api_timeout: number
  }
  general_settings: {
    language: string
    theme: string
    log_level: string
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    api_settings: {
      webadmin_url: "http://localhost:5000",
      fastapi_url: "http://localhost:8000",
      api_timeout: 30000
    },
    general_settings: {
      language: "zh-CN",
      theme: "system",
      log_level: "info"
    }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // 加载系统设置
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // 实际项目中应该使用真实API调用
        // const settingsData = await systemAPI.getSystemSettings()
        // setSettings(settingsData)
        
        // 使用模拟数据，延迟500ms模拟API请求
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } catch (err) {
        console.error("获取系统设置失败:", err)
        setError("获取系统设置失败，请刷新页面重试")
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  // 处理输入变化
  const handleInputChange = (section: 'api_settings' | 'general_settings', field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // 保存设置
  const handleSaveSettings = async () => {
    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // 实际项目中应该使用真实API调用
      // await systemAPI.updateSystemSettings(settings)
      
      // 模拟API请求延迟
      setTimeout(() => {
        setSuccessMessage("设置已成功保存")
        setIsSaving(false)
        
        // 5秒后自动清除成功消息
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }, 1000)
    } catch (err) {
      console.error("保存系统设置失败:", err)
      setError("保存设置失败，请重试")
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">系统设置</h1>

      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">加载中...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md">
              {successMessage}
            </div>
          )}

          {/* API设置 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">API设置</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Webadmin API URL</label>
                <input
                  type="text"
                  value={settings.api_settings.webadmin_url}
                  onChange={(e) => handleInputChange('api_settings', 'webadmin_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Flask后端服务URL，用于用户认证和管理功能</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">FastAPI后端URL</label>
                <input
                  type="text"
                  value={settings.api_settings.fastapi_url}
                  onChange={(e) => handleInputChange('api_settings', 'fastapi_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">FastAPI后端服务URL，用于核心功能API</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">API超时时间(毫秒)</label>
                <input
                  type="number"
                  value={settings.api_settings.api_timeout}
                  onChange={(e) => handleInputChange('api_settings', 'api_timeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* 一般设置 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">一般设置</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">语言</label>
                <select
                  value={settings.general_settings.language}
                  onChange={(e) => handleInputChange('general_settings', 'language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="zh-CN">中文(简体)</option>
                  <option value="en-US">English</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">主题</label>
                <select
                  value={settings.general_settings.theme}
                  onChange={(e) => handleInputChange('general_settings', 'theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="system">跟随系统</option>
                  <option value="light">浅色</option>
                  <option value="dark">深色</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">日志级别</label>
                <select
                  value={settings.general_settings.log_level}
                  onChange={(e) => handleInputChange('general_settings', 'log_level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="debug">Debug</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSaveSettings}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSaving}
            >
              {isSaving ? "保存中..." : "保存设置"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
