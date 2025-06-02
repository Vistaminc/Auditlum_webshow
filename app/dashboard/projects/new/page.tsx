"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { scanAPI } from "@/utils/api"

export default function NewProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    git_repo: "",
    scan_type: {
      code_review: true,
      dependency_check: true,
      secret_detection: false
    },
    exclude_paths: "/node_modules,/dist,/build",
    severity_threshold: "medium"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 处理复选框变化
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      scan_type: {
        ...prev.scan_type,
        [name]: checked
      }
    }))
  }

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // 格式化数据
      const scanTypes = Object.entries(formData.scan_type)
        .filter(([_, value]) => value)
        .map(([key]) => key)

      const excludePaths = formData.exclude_paths
        .split(',')
        .map(path => path.trim())
        .filter(path => path.length > 0)

      const projectData = {
        name: formData.name,
        description: formData.description,
        git_repo: formData.git_repo || undefined,
        scan_settings: {
          scan_type: scanTypes,
          exclude_paths: excludePaths,
          severity_threshold: formData.severity_threshold
        }
      }

      // 实际项目中应该使用真实API调用
      // const response = await scanAPI.createProject(projectData)
      // router.push(`/dashboard/projects/${response.id}`)

      // 模拟API响应
      setTimeout(() => {
        alert("项目创建成功！(模拟)")
        router.push("/dashboard/projects")
        setIsSubmitting(false)
      }, 1000)

    } catch (err) {
      console.error("创建项目失败:", err)
      setError("创建项目失败，请重试")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/projects" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-2">
          ← 返回项目列表
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">新建项目</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* 基本信息 */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">基本信息</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">项目名称 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">项目描述</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="git_repo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Git 仓库地址</label>
                  <input
                    type="text"
                    id="git_repo"
                    name="git_repo"
                    value={formData.git_repo}
                    onChange={handleInputChange}
                    placeholder="https://github.com/vistaminc/AuditLuma"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* 扫描设置 */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">扫描设置</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">扫描类型</label>
                <div className="flex flex-col space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="code_review"
                      checked={formData.scan_type.code_review}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">代码审计</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="dependency_check"
                      checked={formData.scan_type.dependency_check}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">依赖检查</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="secret_detection"
                      checked={formData.scan_type.secret_detection}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">密钥检测</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="exclude_paths" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">排除路径</label>
                <input
                  type="text"
                  id="exclude_paths"
                  name="exclude_paths"
                  value={formData.exclude_paths}
                  onChange={handleInputChange}
                  placeholder="用逗号分隔多个路径"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">用逗号分隔多个路径，例如：/node_modules,/dist,/build</p>
              </div>

              <div>
                <label htmlFor="severity_threshold" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">严重性阈值</label>
                <select
                  id="severity_threshold"
                  name="severity_threshold"
                  value={formData.severity_threshold}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="critical">严重</option>
                  <option value="high">高危</option>
                  <option value="medium">中危</option>
                  <option value="low">低危</option>
                  <option value="info">信息</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">仅显示等于或高于所选严重性级别的问题</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Link href="/dashboard/projects">
                <Button variant="outline" type="button" disabled={isSubmitting}>取消</Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "创建中..." : "创建项目"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
