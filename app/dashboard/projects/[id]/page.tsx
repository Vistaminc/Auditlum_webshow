"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { scanAPI } from "@/utils/api"

interface ProjectDetails {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  git_repo?: string
  scan_settings?: {
    scan_type: string[]
    exclude_paths?: string[]
    severity_threshold?: string
  }
}

interface ScanHistory {
  scan_id: string
  scan_date: string
  scan_status: string
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

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchProjectDetails = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // 实际项目中应该使用真实API调用
        // const projectData = await scanAPI.getProjectById(params.id)
        // setProject(projectData)
        // const scanHistoryData = await scanAPI.getProjectScanHistory(params.id)
        // setScanHistory(scanHistoryData)
        
        // 使用模拟数据
        setTimeout(() => {
          // 模拟项目详情
          const mockProject: ProjectDetails = {
            id: params.id,
            name: params.id === "proj-001" ? "Web应用安全审计" : "移动应用安全检测",
            description: params.id === "proj-001" 
              ? "对企业Web应用进行安全漏洞扫描和代码审计，检测SQL注入、XSS等常见漏洞"
              : "针对Android和iOS应用进行安全分析，检测敏感数据泄露、权限滥用等问题",
            created_at: "2025-05-15 10:00:00",
            updated_at: "2025-05-30 14:30:00",
            git_repo: "https://github.com/vistaminc/AuditLuma",
            scan_settings: {
              scan_type: ["code_review", "dependency_check", "secret_detection"],
              exclude_paths: ["/node_modules", "/dist", "/build"],
              severity_threshold: "medium"
            }
          }
          
          // 模拟扫描历史
          const mockScanHistory: ScanHistory[] = [
            {
              scan_id: "scan-001",
              scan_date: "2025-05-30 14:30:00",
              scan_status: "completed",
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
              scan_date: "2025-05-28 10:15:00",
              scan_status: "completed",
              scan_duration: "32.7秒",
              vulnerability_count: {
                critical: 1,
                high: 4,
                medium: 6,
                low: 3,
                info: 1,
                total: 15
              }
            },
            {
              scan_id: "scan-003",
              scan_date: "2025-05-25 16:45:00",
              scan_status: "failed",
              scan_duration: "12.3秒",
              vulnerability_count: {
                critical: 0,
                high: 0,
                medium: 0,
                low: 0,
                info: 0,
                total: 0
              }
            }
          ]
          
          setProject(mockProject)
          setScanHistory(mockScanHistory)
          setIsLoading(false)
        }, 500) // 模拟API延迟
        
      } catch (err) {
        console.error("获取项目详情失败:", err)
        setError("获取项目数据失败，请刷新页面重试")
        setIsLoading(false)
      }
    }
    
    fetchProjectDetails()
  }, [params.id])

  // 删除项目函数  
  const handleDeleteProject = async () => {
    if (!confirm("确定要删除此项目吗？此操作不可撤销。")) return
    
    try {
      // 实际项目中应该使用真实API调用
      // await scanAPI.deleteProject(params.id)
      alert("项目已删除！(模拟)")
      router.push("/dashboard/projects")
    } catch (err) {
      console.error("删除项目失败:", err)
      alert("删除项目失败，请重试")
    }
  }
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/projects" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-2">
          ← 返回项目列表
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
      ) : project ? (
        <div className="space-y-6">
          {/* 项目概览 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{project.name}</h1>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>
              
              <div className="flex space-x-2">
                <Link href={`/dashboard/projects/${project.id}/edit`}>
                  <Button variant="outline" size="sm">编辑项目</Button>
                </Link>
                <Link href={`/dashboard/projects/${project.id}/scan`}>
                  <Button className="bg-green-600 hover:bg-green-700" size="sm">开始扫描</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={handleDeleteProject}>
                  删除
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">创建时间: {project.created_at}</p>
                <p className="text-gray-500 dark:text-gray-400">最后更新: {project.updated_at}</p>
              </div>
              <div>
                {project.git_repo && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Git仓库: <a href={project.git_repo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{project.git_repo}</a>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* 扫描设置 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">扫描设置</h2>
            
            {project.scan_settings && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">扫描类型</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.scan_settings.scan_type.map(type => (
                      <span key={type} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
                        {type === "code_review" ? "代码审计" :
                         type === "dependency_check" ? "依赖检查" :
                         type === "secret_detection" ? "密钥检测" : type}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">排除路径</h3>
                  {project.scan_settings.exclude_paths?.length ? (
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                      {project.scan_settings.exclude_paths.map(path => (
                        <li key={path}>{path}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">无</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">严重性阈值</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.scan_settings.severity_threshold === "critical" ? "严重" :
                     project.scan_settings.severity_threshold === "high" ? "高危" :
                     project.scan_settings.severity_threshold === "medium" ? "中危" :
                     project.scan_settings.severity_threshold === "low" ? "低危" : "信息"}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* 扫描历史 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">扫描历史</h2>
            
            {scanHistory.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">暂无扫描记录</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">扫描ID</th>
                      <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">扫描时间</th>
                      <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">状态</th>
                      <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">持续时间</th>
                      <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">漏洞总数</th>
                      <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">严重程度</th>
                      <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanHistory.map((scan) => (
                      <tr key={scan.scan_id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{scan.scan_id}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{scan.scan_date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            scan.scan_status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                            scan.scan_status === "running" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}>
                            {scan.scan_status === "completed" ? "已完成" :
                             scan.scan_status === "running" ? "运行中" : "失败"}
                          </span>
                        </td>
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
                          {scan.scan_status === "completed" && (
                            <Link href={`/dashboard/projects/${project.id}/scan/${scan.scan_id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                              查看报告
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">找不到项目信息</p>
        </div>
      )}
    </div>
  )
}
