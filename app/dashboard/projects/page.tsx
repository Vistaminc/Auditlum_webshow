"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { scanAPI } from "@/utils/api"

interface Project {
  id: string
  name: string
  description: string
  last_scan_date: string
  scan_count: number
  vulnerability_count: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // 实际项目中应该使用真实API调用
        // const projectsData = await scanAPI.getProjects()
        // setProjects(projectsData)
        
        // 使用模拟数据
        setTimeout(() => {
          const mockProjects: Project[] = [
            {
              id: "proj-001",
              name: "Web应用安全审计",
              description: "对企业Web应用进行安全漏洞扫描和代码审计",
              last_scan_date: "2025-05-30 14:30:00",
              scan_count: 5,
              vulnerability_count: 12
            },
            {
              id: "proj-002",
              name: "移动应用安全检测",
              description: "针对Android和iOS应用进行安全分析",
              last_scan_date: "2025-05-28 10:15:00",
              scan_count: 3,
              vulnerability_count: 8
            },
            {
              id: "proj-003",
              name: "开源组件风险评估",
              description: "分析项目依赖的开源组件安全风险",
              last_scan_date: "2025-05-25 16:45:00",
              scan_count: 2,
              vulnerability_count: 5
            }
          ]
          setProjects(mockProjects)
          setIsLoading(false)
        }, 500) // 模拟API延迟
        
      } catch (err) {
        console.error("获取项目列表失败:", err)
        setError("获取项目数据失败，请刷新页面重试")
        setIsLoading(false)
      }
    }
    
    fetchProjects()
  }, [])
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">项目管理</h1>
        <Link href="/dashboard/projects/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            新建项目
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">加载中...</p>
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">暂无项目</p>
          <Link href="/dashboard/projects/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              创建你的第一个项目
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>扫描次数: {project.scan_count}</span>
                  <span>漏洞数量: {project.vulnerability_count}</span>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">最近扫描: {project.last_scan_date}</p>
                
                <div className="flex space-x-2">
                  <Link href={`/dashboard/projects/${project.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      查看详情
                    </Button>
                  </Link>
                  <Link href={`/dashboard/projects/${project.id}/scan`} className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      开始扫描
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
