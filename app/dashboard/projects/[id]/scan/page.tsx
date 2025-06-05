"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { scanAPI } from "@/utils/api"

interface ScanStatus {
  id: string
  project_id: string
  status: "queued" | "running" | "completed" | "failed"
  progress: number
  started_at: string
  completed_at?: string
  error_message?: string
  findings_count?: {
    critical: number
    high: number
    medium: number
    low: number
    info: number
  }
  scan_type: string[]
}

export default function ScanPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = params.id
  const [scanStatus, setScanStatus] = useState<ScanStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)

  // u52a0u8f7du626bu63cfu72b6u6001
  const fetchScanStatus = async () => {
    try {
      // u5b9eu9645u9879u76eeu4e2du5e94u8be5u4f7fu7528u771fu5b9eAPIu8c03u7528
      // const status = await scanAPI.getScanStatus(projectId)
      
      // u6a21u62dfu626bu63cfu72b6u6001
      const mockStatus: ScanStatus = {
        id: "scan-123",
        project_id: projectId,
        status: "running",
        progress: Math.min(100, Math.floor(Math.random() * 100)), // u968fu673au751fu6210u8fdbu5ea6u4ee5u6a21u62dfu53d8u5316
        started_at: new Date().toISOString(),
        scan_type: ["code_review", "dependency_check"]
      }
      
      // u6a21u62dfu626bu63cfu5b8cu6210u72b6u6001
      if (mockStatus.progress === 100) {
        mockStatus.status = "completed"
        mockStatus.completed_at = new Date().toISOString()
        mockStatus.findings_count = {
          critical: Math.floor(Math.random() * 3),
          high: Math.floor(Math.random() * 5),
          medium: Math.floor(Math.random() * 10),
          low: Math.floor(Math.random() * 15),
          info: Math.floor(Math.random() * 20)
        }
      }
      
      setScanStatus(mockStatus)
      setIsLoading(false)
      
      // u5982u679cu626bu63cfu5b8cu6210u6216u5931u8d25uff0cu505cu6b62u8f6eu8be2
      if (mockStatus.status === "completed" || mockStatus.status === "failed") {
        if (pollingInterval) {
          clearInterval(pollingInterval)
          setPollingInterval(null)
        }
      }
    } catch (err) {
      console.error("u83b7u53d6u626bu63cfu72b6u6001u5931u8d25:", err)
      setError("u83b7u53d6u626bu63cfu72b6u6001u5931u8d25uff0cu8bf7u5237u65b0u9875u9762u91cdu8bd5")
      setIsLoading(false)
      
      if (pollingInterval) {
        clearInterval(pollingInterval)
        setPollingInterval(null)
      }
    }
  }

  // u521du59cbu5316u65f6u52a0u8f7du626bu63cfu72b6u6001
  useEffect(() => {
    fetchScanStatus()
    
    // u8bbeu7f6eu8f6eu8be2u95f4u9694uff0cu6bcf3u79d2u66f4u65b0u4e00u6b21u626bu63cfu72b6u6001
    const interval = setInterval(fetchScanStatus, 3000)
    setPollingInterval(interval)
    
    // u6e05u7406u8f6eu8be2
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [projectId])

  // u542fu52a8u65b0u626bu63cf
  const handleStartScan = async () => {
    setIsStarting(true)
    setError(null)
    
    try {
      // u5b9eu9645u9879u76eeu4e2du5e94u8be5u4f7fu7528u771fu5b9eAPIu8c03u7528
      // const result = await scanAPI.startScan(projectId)
      // setScanStatus(result)
      
      // u6a21u62dfu542fu52a8u626bu63cf
      setTimeout(() => {
        const mockStatus: ScanStatus = {
          id: `scan-${Date.now()}`,
          project_id: projectId,
          status: "queued",
          progress: 0,
          started_at: new Date().toISOString(),
          scan_type: ["code_review", "dependency_check"]
        }
        
        setScanStatus(mockStatus)
        setIsStarting(false)
        
        // u91cdu65b0u542fu52a8u8f6eu8be2
        if (pollingInterval) {
          clearInterval(pollingInterval)
        }
        const interval = setInterval(fetchScanStatus, 3000)
        setPollingInterval(interval)
      }, 1000)
    } catch (err) {
      console.error("u542fu52a8u626bu63cfu5931u8d25:", err)
      setError("u542fu52a8u626bu63cfu5931u8d25uff0cu8bf7u91cdu8bd5")
      setIsStarting(false)
    }
  }

  // u67e5u770bu626bu63cfu7ed3u679c
  const handleViewResults = () => {
    router.push(`/dashboard/projects/${projectId}/results/${scanStatus?.id}`)
  }

  // u8fd4u56deu9879u76eeu8be6u60c5
  const handleBackToProject = () => {
    router.push(`/dashboard/projects/${projectId}`)
  }

  // u83b7u53d6u72b6u6001u7c7bu540d
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'queued':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  // u83b7u53d6u72b6u6001u663eu793a
  const getStatusText = (status: string) => {
    switch (status) {
      case 'queued':
        return 'u7b49u5f85u4e2d'
      case 'running':
        return 'u626bu63cfu4e2d'
      case 'completed':
        return 'u5df2u5b8cu6210'
      case 'failed':
        return 'u5931u8d25'
      default:
        return 'u672au77e5'
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center mb-6">
        <Link href={`/dashboard/projects/${projectId}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-2">
          u2190 u8fd4u56deu9879u76eeu8be6u60c5
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">u9879u76eeu626bu63cf</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">u52a0u8f7du626bu63cfu72b6u6001u4e2d...</p>
          </div>
        ) : scanStatus ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">u626bu63cfu72b6u6001</h2>
                <div className="flex items-center mt-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(scanStatus.status)}`}>
                    {getStatusText(scanStatus.status)}
                  </span>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    u626bu63cf ID: {scanStatus.id}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                {scanStatus.status !== 'running' && scanStatus.status !== 'queued' && (
                  <Button onClick={handleStartScan} disabled={isStarting} className="bg-blue-600 hover:bg-blue-700">
                    {isStarting ? 'u542fu52a8u4e2d...' : 'u542fu52a8u65b0u626bu63cf'}
                  </Button>
                )}
                {scanStatus.status === 'completed' && (
                  <Button onClick={handleViewResults} className="bg-green-600 hover:bg-green-700">
                    u67e5u770bu626bu63cfu7ed3u679c
                  </Button>
                )}
              </div>
            </div>

            {/* u626bu63cfu8fdbu5ea6 */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">u8fdbu5ea6</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{scanStatus.progress}%</span>
              </div>
              <Progress value={scanStatus.progress} className="h-2" />
            </div>

            {/* u626bu63cfu4fe1u606f */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">u626bu63cfu7c7bu578b</h3>
                <div className="flex flex-wrap gap-2">
                  {scanStatus.scan_type.map((type) => (
                    <span key={type} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {type === 'code_review' ? 'u4ee3u7801u5ba1u8ba1' : 
                       type === 'dependency_check' ? 'u4f9du8d56u68c0u67e5' : 
                       type === 'secret_detection' ? 'u5bc6u94a5u68c0u6d4b' : type}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">u626bu63cfu65f6u95f4</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  u5f00u59cbu65f6u95f4: {new Date(scanStatus.started_at).toLocaleString()}
                </p>
                {scanStatus.completed_at && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    u5b8cu6210u65f6u95f4: {new Date(scanStatus.completed_at).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* u626bu63cfu7ed3u679cu6982u8981 - u4ec5u5728u626bu63cfu5b8cu6210u65f6u663eu793a */}
            {scanStatus.status === 'completed' && scanStatus.findings_count && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">u626bu63cfu7ed3u679cu6982u8981</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  <div className="bg-red-50 dark:bg-red-900 p-3 rounded-md">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">u4e25u91cd</p>
                    <p className="text-2xl font-bold text-red-800 dark:text-red-200">{scanStatus.findings_count.critical}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900 p-3 rounded-md">
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-200">u9ad8u5371</p>
                    <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">{scanStatus.findings_count.high}</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded-md">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">u4e2du5371</p>
                    <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{scanStatus.findings_count.medium}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">u4f4eu5371</p>
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{scanStatus.findings_count.low}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">u4fe1u606f</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{scanStatus.findings_count.info}</p>
                  </div>
                </div>
              </div>
            )}

            {/* u9519u8befu4fe1u606f - u5982u679cu626bu63cfu5931u8d25 */}
            {scanStatus.status === 'failed' && scanStatus.error_message && (
              <div className="p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md">
                <h3 className="font-medium mb-1">u626bu63cfu5931u8d25:</h3>
                <p>{scanStatus.error_message}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">u6ca1u6709u626bu63cfu4fe1u606f</p>
            <Button 
              onClick={handleStartScan} 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              disabled={isStarting}
            >
              {isStarting ? 'u542fu52a8u4e2d...' : 'u542fu52a8u626bu63cf'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
