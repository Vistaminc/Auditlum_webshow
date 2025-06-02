"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle, Shield, Code, Database, FileText, ChevronRight, Github, Mail, Phone, ExternalLink, MessageCircle, Twitter, Settings } from "lucide-react"

// 定义动画变量
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -50 }
}

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 50 }
}

const popIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 10 } },
  exit: { scale: 0.8, opacity: 0 }
}

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, checkAuthStatus } = useAuthStore()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* 背景装饰 - 更加精致的渐变和图案 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* 主背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 opacity-80"></div>
        
        {/* 背景图形元素 */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-5%] left-[-10%] w-[60%] h-[30%] bg-gradient-to-tr from-indigo-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full filter blur-3xl"></div>
        
        {/* 网格装饰 */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.2] dark:opacity-[0.05]"></div>
        
        {/* 微妙的粒子效果 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.08)_0,rgba(120,119,198,0)_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.12)_0,rgba(120,119,198,0)_60%)] z-[-1]"></div>
      </div>
      
      {/* 简化导航栏 - 加入动画效果 */}
      <motion.header 
        className="sticky top-0 z-50 w-full backdrop-blur-sm bg-transparent"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              variants={slideInLeft}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-50 blur-sm"></div>
                  <Image src="/icon/facvion.png" alt="AuditLuma" width={40} height={40} className="relative z-10" />
                </div>
              </motion.div>
              <div className="flex items-center">
                <motion.span 
                  className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  AuditLuma
                </motion.span>
                <motion.span 
                  className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  v1.0.0
                </motion.span>
              </div>
            </motion.div>
            
            {/* 登录/注册按钮 */}
            <AnimatePresence mode="wait">
              {isAuthenticated ? (
                <motion.div 
                  key="authenticated"
                  className="flex items-center space-x-4"
                  variants={slideInRight}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button 
                      onClick={() => router.push("/dashboard")} 
                      variant="ghost"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                    >
                      <span className="flex items-center">
                        <span>进入控制台</span>
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                        >
                          <ArrowRight className="w-4 h-4 ml-2 stroke-[1.5]" />
                        </motion.span>
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="unauthenticated"
                  className="flex items-center space-x-3"
                  variants={slideInRight}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button 
                      onClick={() => router.push("/login")} 
                      variant="ghost"
                      className="text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                    >
                      <span>登录 / 注册</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button 
                      onClick={() => router.push("/dashboard")} 
                      variant="ghost"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                    >
                      <span>免费使用</span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      <motion.main 
        className="relative z-10 container mx-auto px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* 英雄区域 - 更具科技感和动感的设计 */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between py-20 gap-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="lg:w-1/2 space-y-8" variants={slideInLeft}>
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              <Shield className="w-4 h-4 mr-2" /> 结合先进AI技术的代码安全解决方案
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                智能代码安全审计
              </motion.span>
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                为您的应用保驾护航
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              AuditLuma 结合双后端架构和AI技术，提供全方位代码安全解决方案，自动识别并修复潜在漏洞，让开发者专注于创造价值。
            </motion.p>
            
            <motion.div 
              className="flex items-center space-x-4 text-gray-600 dark:text-gray-300"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.1, staggerChildren: 0.2 }}
            >
              <motion.div 
                className="flex items-center"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span>先进AI分析</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span>双后端架构</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span>自动修复建议</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 pt-6"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => router.push("/register")} 
                  className="group relative overflow-hidden bg-blue-600 text-white px-8 py-3.5 rounded-lg shadow-lg hover:shadow-blue-600/30 transition-all duration-300 text-base font-medium"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500"></div>
                  <span className="relative flex items-center justify-center">
                    <span>免费开始使用</span>
                    <motion.span 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, repeatDelay: 3, duration: 1 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => router.push("https://github.com/vistaminc/auditluma")} 
                  variant="outline"
                  className="group relative px-8 py-3.5 border border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm hover:shadow transition-all duration-300 text-base font-medium"
                >
                  <span className="flex items-center justify-center">
                    <span>项目地址</span>
                    <motion.span 
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink className="ml-2 h-4 w-4 transition-all duration-300" />
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            </motion.div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 pt-2">
              <div className="flex items-center">
                <Github className="w-3 h-3 mr-1 text-gray-500 stroke-[1.5]" />
                <span>Github开源项目</span>
              </div>
              <div className="flex items-center">
                <Database className="w-3 h-3 mr-1 text-gray-500 stroke-[1.5]" />
                <span>支持漏洞数据库</span>
              </div>
            </div>
          </motion.div>
          
          
          <motion.div 
            className="lg:w-1/2"
            variants={slideInRight}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {/* 装饰光晕 */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 animate-pulse-slow"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
              ></motion.div>
              
              {/* 主显示面板 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* 面板顶栏 */}
                <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-3 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mx-auto font-mono text-sm text-gray-500 dark:text-gray-400">AuditLuma 安全分析</div>
                </div>
                
                {/* 内容区域 */}
                <div className="p-6 sm:p-8">
                  {/* 代码扫描可视化 */}
                  <motion.div 
                    className="w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-lg flex flex-col justify-center items-center p-6 border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <div className="w-full flex justify-between items-center mb-4">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-300">扫描进度</div>
                      <div className="text-sm font-mono text-blue-600 dark:text-blue-400">412/550 文件</div>
                    </div>
                    
                    <motion.div 
                      className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-8"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                      ></motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="w-full grid grid-cols-3 gap-4 text-center"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                      transition={{ delayChildren: 2, staggerChildren: 0.2 }}
                    >
                      <motion.div 
                        className="flex flex-col items-center"
                        variants={popIn}
                      >
                        <div className="text-2xl font-bold text-red-500">12</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">高危漏洞</div>
                      </motion.div>
                      <motion.div 
                        className="flex flex-col items-center"
                        variants={popIn}
                      >
                        <div className="text-2xl font-bold text-yellow-500">28</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">中危漏洞</div>
                      </motion.div>
                      <motion.div 
                        className="flex flex-col items-center"
                        variants={popIn}
                      >
                        <div className="text-2xl font-bold text-blue-500">45</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">低危漏洞</div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  {/* 代码示例 */}
                  <motion.div 
                    className="mt-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded text-xs">高危漏洞</div>
                      <div className="text-gray-500 dark:text-gray-400">SQL注入风险</div>
                    </div>
                    <div className="text-gray-800 dark:text-gray-200">
                      <div><span className="text-gray-400">42 |</span> <span className="text-red-500">query = "SELECT * FROM users WHERE id = " + input_value</span></div>
                      <div><span className="text-gray-400">43 |</span> cursor.execute(query)</div>
                      <div><span className="text-gray-400">44 |</span> </div>
                    </div>
                    <div className="mt-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">修复建议:</div>
                      <div>query = "SELECT * FROM users WHERE id = %s"</div>
                      <div>cursor.execute(query, (user_id,))</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* 统计数据部分 - 展示用户信任和系统能力 */}
        <motion.div
          className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-6">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div 
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                variants={popIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10k+</div>
                <div className="text-gray-600 dark:text-gray-300">每日扫描代码行数</div>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                variants={popIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">85%</div>
                <div className="text-gray-600 dark:text-gray-300">漏洞修复准确率</div>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                variants={popIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-300">企业级客户</div>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                variants={popIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">24×7</div>
                <div className="text-gray-600 dark:text-gray-300">全天候安全支持</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* 工作流程部分 - 简明展示系统工作原理 */}
        <motion.div 
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div 
                className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Settings className="w-4 h-4 mr-2" /> 简单四步，自动保障代码安全
              </motion.div>
              
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                如何使用 AuditLuma
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                从代码上传到安全报告生成，AuditLuma全自动处理整个流程
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">1</div>
                <h3 className="text-xl font-bold mb-3 mt-2">上传代码</h3>
                <p className="text-gray-600 dark:text-gray-400">通过Git仓库链接、ZIP压缩包或直接粘贴代码片段上传待分析代码</p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">2</div>
                <h3 className="text-xl font-bold mb-3 mt-2">AI扫描</h3>
                <p className="text-gray-600 dark:text-gray-400">AuditLuma的AI引擎自动识别安全漏洞、代码质量问题和潜在性能瓶颈</p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">3</div>
                <h3 className="text-xl font-bold mb-3 mt-2">生成修复方案</h3>
                <p className="text-gray-600 dark:text-gray-400">智能分析问题原因，并提供针对性修复代码建议，一键应用修复</p>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">4</div>
                <h3 className="text-xl font-bold mb-3 mt-2">安全报告</h3>
                <p className="text-gray-600 dark:text-gray-400">生成详细的安全分析报告，包含漏洞分布、风险等级和完整修复记录</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => router.push('/dashboard')}
              >
                立即开始使用
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* 客户见证部分 */}
        <motion.div 
          className="py-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div 
                className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm font-medium mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> 客户见证
              </motion.div>
              
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                他们都在使用 AuditLuma
              </motion.h2>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl mr-4">ZT</div>
                  <div>
                    <h4 className="font-bold">张涛</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">某大型电商技术总监</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">"AuditLuma帮助我们在上线前发现了多个高危漏洞，避免了潜在的数据泄露风险，为我们节省了大量的安全维护成本。"</p>
                <div className="mt-4 flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl mr-4">LM</div>
                  <div>
                    <h4 className="font-bold">李敏</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">金融科技公司首席安全官</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">"作为金融行业，代码安全对我们至关重要。AuditLuma的双后端架构和AI驱动的安全分析能力让我们的应用更加安全可靠。"</p>
                <div className="mt-4 flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl mr-4">WJ</div>
                  <div>
                    <h4 className="font-bold">王俊</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">初创公司CTO</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">"对于我们这样的小团队，AuditLuma就像多了一位安全专家，自动识别和修复漏洞的能力让我们能够专注于产品创新。"</p>
                <div className="mt-4 flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* 特性部分 - 突出双后端架构优势 */}
        <motion.div 
          id="features" 
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Code className="w-4 h-4 mr-2" /> 专业级安全分析引擎
            </motion.div>
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              全方位代码安全解决方案
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              利用双后端架构提供强大的安全审计与修复功能，全面保障您的应用安全
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
          >
            {/* 特性卡片 1 - 代码审计 */}
            <motion.div 
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              ></motion.div>
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 mb-6 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <motion.h3 className="text-xl font-bold mb-3 flex items-center">
                  <span>AI代码审计</span>
                  <motion.span 
                    className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    FastAPI驱动
                  </motion.span>
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-4"
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  利用先进AI模型深度分析源代码，精确识别安全漏洞和质量问题，提供全面代码健康评估。
                </motion.p>
                <motion.ul 
                  className="mb-4 space-y-2"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.li 
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    variants={fadeIn}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>OWASP Top 10漏洞检测</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    variants={fadeIn}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>代码质量评估</span>
                  </motion.li>
                </motion.ul>
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link href="/dashboard" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                    了解更多
                    <motion.span 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                    >
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* 特性卡片 2 - 智能修复 */}
            <motion.div 
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.2 }}
              ></motion.div>
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 mb-6 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <Code className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </motion.div>
                <motion.h3 className="text-xl font-bold mb-3 flex items-center">
                  <span>智能修复建议</span>
                  <motion.span 
                    className="ml-2 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    双后端协同
                  </motion.span>
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-4"
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  基于漏洞类型和代码上下文，提供精准修复建议和代码示例，帮助开发团队快速解决安全问题。
                </motion.p>
                <motion.ul 
                  className="mb-4 space-y-2"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.li 
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    variants={fadeIn}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>上下文感知修复</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    variants={fadeIn}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>代码示例与解释</span>
                  </motion.li>
                </motion.ul>
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link href="/dashboard/projects/new" className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium group-hover:underline">
                    了解更多
                    <motion.span 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                    >
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* 特性卡片 3 - 管理功能 */}
            <motion.div 
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.4 }}
              ></motion.div>
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 mb-6 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                >
                  <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </motion.div>
                <motion.h3 className="text-xl font-bold mb-3 flex items-center">
                  <span>安全管理中心</span>
                  <motion.span 
                    className="ml-2 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    Webadmin支持
                  </motion.span>
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-4"
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  集中化管理所有代码安全相关活动，包括账户管理、分析结果查看、异常警报等功能。
                </motion.p>
                <motion.ul 
                  className="mb-4 space-y-2"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.li 
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    variants={fadeIn}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>可视化分析报告</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    variants={fadeIn}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>编程语言兼容</span>
                  </motion.li>
                </motion.ul>
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link href="/dashboard/admin" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                    了解更多
                    <motion.span 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                    >
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 技术架构部分 - 突出双后端优势 */}
        <motion.div 
          id="architecture" 
          className="py-20 bg-gray-50 dark:bg-gray-900/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Database className="w-4 h-4 mr-2" /> 高级架构设计
              </motion.div>
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                双后端架构，安全与功能并重
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                AuditLuma采用先进的双后端架构，分离管理功能与业务功能，提供更安全的系统设计
              </motion.p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <motion.div 
                  className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-700"
                  variants={slideInLeft}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="flex items-center space-x-4 mb-6"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-xl font-bold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        Flask Webadmin
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        管理员和账户功能
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  <motion.ul 
                    className="space-y-4 mb-6"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
                  >
                    <motion.li 
                      className="flex items-start"
                      variants={fadeIn}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <motion.p className="font-medium">用户认证与授权</motion.p>
                        <motion.p className="text-sm text-gray-600 dark:text-gray-400">处理登录、注册和账户权限管理，维护用户会话</motion.p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      variants={fadeIn}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <motion.p className="font-medium">数据库管理</motion.p>
                        <motion.p className="text-sm text-gray-600 dark:text-gray-400">配置和维护数据库连接，处理数据存储和管理</motion.p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      variants={fadeIn}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <motion.p className="font-medium">用户积分与优惠</motion.p>
                        <motion.p className="text-sm text-gray-600 dark:text-gray-400">管理用户订阅、积分和特权功能访问</motion.p>
                      </div>
                    </motion.li>
                  </motion.ul>
                  
                  <motion.div 
                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-2 h-2 bg-green-500 rounded-full mr-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.span>
                    Flask 框架实现
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="p-8 md:p-12"
                  variants={slideInRight}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="flex items-center space-x-4 mb-6"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-xl font-bold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        FastAPI 后端
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        核心功能实现
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  <motion.ul 
                    className="space-y-4 mb-6"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
                  >
                    <motion.li 
                      className="flex items-start"
                      variants={fadeIn}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <motion.p className="font-medium">代码扫描与分析</motion.p>
                        <motion.p className="text-sm text-gray-600 dark:text-gray-400">处理代码安全扫描、漏洞检测和漏洞评估</motion.p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      variants={fadeIn}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <motion.p className="font-medium">AI修复建议</motion.p>
                        <motion.p className="text-sm text-gray-600 dark:text-gray-400">生成智能化的代码修复方案和安全最佳实践建议</motion.p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      variants={fadeIn}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <motion.p className="font-medium">实时API集成</motion.p>
                        <motion.p className="text-sm text-gray-600 dark:text-gray-400">提供高性能异步API，支持第三方集成和实时分析</motion.p>
                      </div>
                    </motion.li>
                  </motion.ul>
                  
                  <motion.div 
                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="w-2 h-2 bg-green-500 rounded-full mr-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.span>
                    FastAPI 异步框架
                  </motion.div>
                </motion.div>
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                  <span>双后端架构确保管理功能与核心业务功能分离，提供更好的安全性和维护性</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>


      </motion.main>

      {/* 常见问题解答部分 */}
      <motion.div 
        className="py-20 relative z-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FileText className="w-4 h-4 mr-2" /> 常见问题解答
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              您可能关心的问题
            </motion.h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-xl font-bold mb-3">AuditLuma支持哪些编程语言？</h3>
              <p className="text-gray-600 dark:text-gray-400">目前支持Java、Python、JavaScript/TypeScript、C/C++、PHP、Ruby、Go等主流编程语言，并持续增加更多语言支持。</p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-xl font-bold mb-3">如何集成到我的CI/CD流程？</h3>
              <p className="text-gray-600 dark:text-gray-400">AuditLuma提供完整的API和集成插件，可以无缝集成到GitHub Actions、Jenkins、GitLab CI等主流CI/CD平台，实现自动化安全检测。</p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-xl font-bold mb-3">AuditLuma与传统代码扫描工具有何区别？</h3>
              <p className="text-gray-600 dark:text-gray-400">AuditLuma结合了AI技术和传统规则扫描，不仅能识别已知漏洞模式，还能理解代码语境，智能分析潜在安全风险，大幅降低误报率。</p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-xl font-bold mb-3">对代码隐私有何保障？</h3>
              <p className="text-gray-600 dark:text-gray-400">所有代码分析均在安全隔离环境中进行，分析完成后自动销毁。我们不会存储您的源代码，并提供私有部署选项满足更高安全需求。</p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-xl font-bold mb-3">AuditLuma适合哪些规模的团队？</h3>
              <p className="text-gray-600 dark:text-gray-400">从独立开发者到大型企业，我们提供灵活的套餐选择。初创团队可以使用免费版，成长中的团队可选择专业版，大型企业可选择企业版获得定制服务。</p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-xl font-bold mb-3">如何评估安全扫描的有效性？</h3>
              <p className="text-gray-600 dark:text-gray-400">我们提供详细的安全分析报告和风险评分，并与OWASP Top 10等行业标准对标。您可以免费试用并与现有工具对比效果。</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* 行动召唤部分 */}
      <motion.div 
        className="py-24 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 text-gray-800 relative z-30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            让您的代码更安全，从今天开始
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            注册即获得30天免费企业试用，无需信用卡
          </motion.p>
          
          <motion.div 
            className="flex justify-center max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              onClick={() => router.push('/register')}
            >
              免费开始使用
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* 页脚 - 美化设计与社交媒体图标 */}
      <footer className="relative z-40 bg-white dark:bg-gray-900 pt-16 pb-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          {/* 顶部装饰元素 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex items-center justify-center">
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-50 blur-sm"></div>
              <Image src="/icon/facvion.png" alt="AuditLuma" width={40} height={40} className="relative z-10" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-5">
                <div className="relative">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30 blur-sm"></div>
                    <Image src="/icon/facvion.png" alt="AuditLuma" width={32} height={32} className="relative z-10" />
                  </div>
                </div>
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AuditLuma</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                智能代码安全审计工具，基于双后端架构，帮助开发者自动发现和修复代码中的安全漏洞，保障应用安全。
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link href="https://github.com/vistaminc/auditluma" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                  <Github className="w-8 h-5 stroke-[1.5]" />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                  <svg viewBox="0 0 1024 1024" className="w-8 h-5" fill="currentColor">
                    <path d="M761.759375 122h132.320625L605 452.4003125 945.08 902H678.8L470.24 629.3196875 231.599375 902H99.2l309.1996875-353.4L82.16 122h273.0403125l188.52 249.24z m-46.4390625 700.8h73.32L315.359375 197.0403125h-78.680625z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                  <svg viewBox="0 0 1024 1024" className="w-8 h-6" fill="currentColor">
                    <path d="M387.878788 610.055758a46.545455 46.545455 0 1 0 0-93.09091 46.545455 46.545455 0 0 0 0 93.09091zM636.121212 610.055758a46.545455 46.545455 0 1 0 0-93.09091 46.545455 46.545455 0 0 0 0 93.09091z" />
                    <path d="M710.593939 344.870788a648.967758 648.967758 0 0 0-198.376727-29.602909h-0.434424a649.091879 649.091879 0 0 0-198.407758 29.602909A31.030303 31.030303 0 1 1 294.787879 285.66497 711.090424 711.090424 0 0 1 512 253.207273a711.059394 711.059394 0 0 1 217.150061 32.457697 31.030303 31.030303 0 1 1-18.525091 59.205818zM274.494061 678.353455a31.030303 31.030303 0 0 1 38.880969-20.324849c64.201697 20.076606 131.134061 30.099394 198.407758 29.602909h0.434424a648.967758 648.967758 0 0 0 198.407758-29.602909 31.030303 31.030303 0 0 1 18.525091 59.205818A711.059394 711.059394 0 0 1 512 749.692121 711.059394 711.059394 0 0 1 294.787879 717.234424a31.030303 31.030303 0 0 1-20.324849-38.880969z" />
                    <path d="M686.793697 147.518061c41.084121 8.843636 81.299394 21.286788 120.242424 37.236363h0.062061a62.122667 62.122667 0 0 1 35.84 39.594667l131.816727 439.389091a62.308848 62.308848 0 0 1-19.052606 64.791273c-64.170667 55.761455-150.931394 98.27297-249.918061 122.476606h-0.155151a61.936485 61.936485 0 0 1-69.880243-32.643879v-0.062061l-46.607515-93.184a31.030303 31.030303 0 0 1 55.513212-27.741091l46.638546 93.277091c91.229091-22.341818 168.432485-60.943515 223.728485-109.009454l0.155151-0.093091 0.062061-0.093091v-0.124121L783.484121 242.191515l-0.03103-0.06206A651.015758 651.015758 0 0 0 673.667879 208.213333l-0.093091-0.03103a0.062061 0.062061 0 0 0-0.093091 0.03103l-30.906182 92.749576a31.030303 31.030303 0 1 1-58.895515-19.611151l30.937212-92.842667a62.122667 62.122667 0 0 1 72.176485-40.96zM350.456242 208.151273h-0.155151c-37.515636 8.067879-74.255515 19.456-109.754182 33.978182l-0.03103 0.03103v0.03103L108.730182 681.332364v0.124121s0 0.062061 0.06206 0.093091l0.124122 0.093091c55.296 48.09697 132.530424 86.667636 223.728484 109.009454l46.669576-93.277091a31.030303 31.030303 0 1 1 55.513212 27.741091l-46.607515 93.215031a61.936485 61.936485 0 0 1-69.880242 32.705939l-0.155152-0.03103c-98.986667-24.203636-185.778424-66.715152-249.91806-122.476606a62.246788 62.246788 0 0 1-19.052606-64.791273v-0.124121L181.092848 224.349091A62.184727 62.184727 0 0 1 216.901818 184.754424h0.062061a713.169455 713.169455 0 0 1 120.242424-37.236363 62.122667 62.122667 0 0 1 72.145455 40.96v0.06206l30.937212 92.780606a31.030303 31.030303 0 0 1-58.864485 19.611152l-30.906182-92.749576h-0.062061z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
                  <Mail className="w-8 h-5 stroke-[1.5]" />
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-5">产品</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                    控制台
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/projects/new" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                    新建项目
                  </Link>
                </li>
                <li>
                  <Link href="/api/docs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                    API文档
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                    功能特性
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
            <h3 className="font-semibold text-lg mb-5">联系&支持</h3>
              <div className="space-y-5">
                <div className="group">
                  <a href="mailto:contact@auditluma.com" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-lg dark:text-blue-400 stroke-[1.5]" />
                    <span className="text-sm">vistamin@outlook.com</span>
                  </a>
                </div>
                
                <div className="group">
                  <a href="tel:+8612345678910" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-lg dark:text-blue-400 stroke-[1.5]" />
                    <span className="text-sm">+86 123 4567 8910</span>
                  </a>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <svg className="w-6 h-6 text-lg dark:text-blue-400" viewBox="0 0 1228 1024" fill="currentColor" strokeWidth="0">
                      <path d="M1045.84 747.027a153.563 153.563 0 0 0-53.156 21.515 129.094 129.094 0 0 1-58.092 35.1c2.953-19.828 12.783-37.926 27.633-51.3a191.186 191.186 0 0 0 26.452-62.142a56.953 56.953 0 1 1 57.164 56.827zM941.639 610.634a190.814 190.814 0 0 0-61.932-26.747a56.953 56.953 0 1 1 56.953-56.953a155.266 155.266 0 0 0 21.263 53.325a129.666 129.666 0 0 1 34.762 58.346a85.978 85.978 0 0 1-50.878-27.97h-0.21z m-93.826-200.728c-17.17-143.817-166.092-256.5-346.274-256.5-191.954 0-348.132 127.744-348.132 284.85a266.33 266.33 0 0 0 124.369 216.169a351.762 351.762 0 0 0 37.969 24.384l-15.44 61.636c5.568 2.616 10.968 5.4 16.663 7.805l77.963-38.981c11.39 2.953 23.372 4.851 35.268 6.876 7.594 1.35 15.188 2.742 22.993 3.67a401.119 401.119 0 0 0 145.547-8.353a281.011 281.011 0 0 0 11.474 62.185a481.153 481.153 0 0 1-108.675 12.698a472.5 472.5 0 0 1-97.621-10.758L262.46 846.21a31.219 31.219 0 0 1-33.877-3.543a31.64 31.64 0 0 1-10.926-32.316l25.312-101.925A330.075 330.075 0 0 1 90.125 438.256c0-192.29 184.19-348.131 411.413-348.131 215.746 0 392.428 140.653 409.64 319.444a276.919 276.919 0 0 0-29.91-2.953c-11.18 0.422-22.36 1.476-33.456 3.248zM716.399 634.47c18.943-3.797 36.957-11.053 53.157-21.515a129.094 129.094 0 0 1 58.134-35.016a86.358 86.358 0 0 1-27.675 51.216c-12.445 18.984-21.389 40.078-26.451 62.184a56.953 56.953 0 1 1-57.165-56.869z m102.6 137.025c18.816 12.614 39.741 21.727 61.763 27a56.953 56.953 0 1 1-56.953 56.953a154.406 154.406 0 0 0-21.094-53.409a129.558 129.558 0 0 1-34.51-58.514a85.888 85.888 0 0 1 50.794 28.308v-0.338z" />
                    </svg>
                    <span className="text-sm">WeChat: AuditLuma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 美化分割线 */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-70"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-900 px-6 py-1 text-sm font-light tracking-wide text-gray-500 dark:text-gray-400 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm">安全代码，强大架构</span>
            </div>
          </div>
          
          <div className="pt-6 flex flex-col items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-blue-500 stroke-[1.5]" />
              <span className="font-normal">© 河南星熠寻光科技有限公司 Copyright 2025</span>
            </p>
            
            {/* 备案信息区域 - 管理员可配置 */}
            <FooterLicenseInfo />
            
            <div className="flex flex-wrap items-center gap-2 mt-3 justify-center">
              <Link href="#" className="px-2.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-800/50 rounded-full transition-colors duration-300">
                隐私政策
              </Link>
              <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
              <Link href="#" className="px-2.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-800/50 rounded-full transition-colors duration-300">
                服务条款
              </Link>
              <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
              <Link href="#" className="px-2.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-800/50 rounded-full transition-colors duration-300">
                帮助中心
              </Link>
              <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
              <Link href="#" className="px-2.5 py-0.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-50 dark:bg-gray-800/50 rounded-full transition-colors duration-300">
                开发者资源
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/**
 * 页脚备案信息组件
 * 从 API 获取可配置的备案信息并显示
 */
function FooterLicenseInfo() {
  // 异步获取网站配置
  // 在实际应用中可使用我们创建的 useSiteConfig hook
  // 这里为了避免引入额外依赖，所以直接使用静态数据
  // 实际应用中可以如下方式使用:
  // import { useSiteConfig } from '@/lib/hooks/useSiteConfig';
  // const { config, isLoading } = useSiteConfig();
  
  // 模拟网站配置数据
  const config = {
    icp: '京ICP备XXXXXXXX号-X',
    psr: '京公网安备XXXXXXXXXX号',
    businessLicense: '增值电信业务经营许可证：京B2-XXXXXXXX',
    otherLicenses: ['互联网信息服务资格证书：(京)-非经营性-XXXX-XXXX']
  };
  
  return (
    <div className="my-3">
      <div className="flex flex-col items-center justify-center space-y-1 text-xs text-gray-500 dark:text-gray-400">
        {/* ICP备案信息 */}
        {config.icp && (
          <Link 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
          >
            备案号：{config.icp}
          </Link>
        )}
        
        {/* 公安备案信息 */}
        {config.psr && (
          <div className="flex items-center space-x-2">
            <Link 
              href="http://www.beian.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
            >
              <Image 
                src="/beian.png" 
                alt="公安备案" 
                width={12} 
                height={12} 
                className="mr-1" 
              />
              {config.psr}
            </Link>
          </div>
        )}
        
        {/* 其他资质证书信息 */}
        <div className="text-xs">
          {config.businessLicense}
          {config.otherLicenses?.length > 0 && (
            <>
              {' | '}
              {config.otherLicenses.join(' | ')}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
