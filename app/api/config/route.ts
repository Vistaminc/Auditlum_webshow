import { NextResponse } from 'next/server';

// 默认配置
const defaultConfig = {
  auth_mode: 'noauth',
  api: {
    base_url: 'http://localhost:8000/api',
    timeout: 30
  }
};

// 处理GET请求
export async function GET() {
  try {
    // 在实际项目中，这里可以从环境变量、数据库或配置文件加载配置
    // 因为无法直接使用fs模块，可以使用环境变量或其他服务端API读取配置
    
    // 返回默认配置（在实际环境中可以替换为真实配置）
    return NextResponse.json(defaultConfig);
  } catch (error) {
    console.error('读取配置失败:', error);
    return NextResponse.json(
      { error: '读取配置失败' },
      { status: 500 }
    );
  }
}
