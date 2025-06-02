import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 网站配置类型
export interface SiteConfig {
  icp: string;
  psr: string;
  businessLicense: string;
  otherLicenses: string[];
}

// 模拟数据库中的配置
// 实际生产环境中应从数据库读取
let siteConfig: SiteConfig = {
  icp: '京ICP备XXXXXXXX号-X',
  psr: '京公网安备XXXXXXXXXX号',
  businessLicense: '增值电信业务经营许可证：京B2-XXXXXXXX',
  otherLicenses: ['互联网药品信息服务资格证书：(京)-非经营性-XXXX-XXXX']
};

// GET /api/site-config
export async function GET() {
  return NextResponse.json(siteConfig);
}

// POST /api/site-config (仅管理员可访问)
export async function POST(request: NextRequest) {
  try {
    // 在实际应用中，这里应该验证用户是否为管理员
    // if (!isAdmin(request)) {
    //   return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    // }
    
    const body = await request.json();
    
    // 验证提交数据
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: '无效的请求数据' }, { status: 400 });
    }
    
    // 更新配置 (只更新提供的字段)
    siteConfig = {
      ...siteConfig,
      ...body
    };
    
    // 在实际应用中，这里应该将更新后的配置保存到数据库
    // await db.siteConfig.update(siteConfig);
    
    return NextResponse.json({ 
      success: true, 
      message: '网站配置已更新',
      data: siteConfig
    });
    
  } catch (error) {
    console.error('更新网站配置时出错:', error);
    return NextResponse.json({ 
      error: '更新配置失败', 
      details: error instanceof Error ? error.message : '未知错误' 
    }, { status: 500 });
  }
}
