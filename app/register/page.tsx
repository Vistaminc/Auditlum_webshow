"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import axios from 'axios'

export default function RegisterPage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authMode, setAuthMode] = useState<string>("login")

  // u52a0u8f7du914du7f6eu4fe1u606f
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config')
        const config = await response.json()
        setAuthMode(config.auth_mode || 'login')
        
        // u5982u679cu662fu975eu767bu5f55u6a21u5f0fuff0cu76f4u63a5u8df3u8f6cu5230u767bu5f55u9875
        if (config.auth_mode === 'noauth') {
          router.push('/login')
        }
      } catch (error) {
        console.error('u83b7u53d6u914du7f6eu5931u8d25:', error)
      }
    }

    fetchConfig()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // u9a8cu8bc1u5bc6u7801u662fu5426u5339u914d
    if (formData.password !== formData.confirmPassword) {
      setError('u4e24u6b21u8f93u5165u7684u5bc6u7801u4e0du4e00u81f4')
      return
    }

    setIsLoading(true)

    try {
      // u8c03u7528u6ce8u518cAPI
      await axios.post('/api/auth/register', {
        username: formData.username,
        password: formData.password,
        email: formData.email
      })

      // u6ce8u518cu6210u529fuff0cu8df3u8f6cu5230u767bu5f55u9875
      router.push('/login?registered=true')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'u6ce8u518cu5931u8d25uff0cu8bf7u7a0du540eu91cdu8bd5')
      } else {
        setError('u7f51u7edcu9519u8befuff0cu8bf7u68c0u67e5u60a8u7684u8fdeu63a5')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // u5982u679cu662fu975eu767bu5f55u6a21u5f0fuff0cu663eu793au6e05u7a7au9875u9762uff08u4f1au81eau52a8u8df3u8f6cuff09
  if (authMode === 'noauth') {
    return <div className="flex min-h-screen items-center justify-center">
      <p>u975eu767bu5f55u6a21u5f0fu4e0bu4e0du652fu6301u6ce8u518cuff0cu6b63u5728u8df3u8f6c...</p>
    </div>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            u6ce8u518c AuditLuma u8d26u53f7
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            u521bu5efau8d26u53f7u4ee5u4f7fu7528u5b8cu6574u529fu80fd
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">u7528u6237u540d</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                placeholder="u7528u6237u540d"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">u7535u5b50u90aeu7bb1</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                placeholder="u7535u5b50u90aeu7bb1"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">u5bc6u7801</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                placeholder="u5bc6u7801"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">u786eu8ba4u5bc6u7801</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                placeholder="u786eu8ba4u5bc6u7801"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    u9519u8bef
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "u6ce8u518cu4e2d..." : "u6ce8u518c"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                u8fd4u56deu9996u9875
              </Link>
            </div>
            <div className="text-sm">
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                u5df2u6709u8d26u53f7uff1fu767bu5f55
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
