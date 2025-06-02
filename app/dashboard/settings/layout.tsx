import React from 'react';
import { Settings, Globe, Shield, BellRing } from 'lucide-react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 设置导航侧边栏 */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                系统设置
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                管理系统和网站配置
              </p>
            </div>
            
            <nav className="space-y-1">
              <SettingsNavItem 
                href="/dashboard/settings/site-config" 
                icon={<Globe className="w-4 h-4" />}
                title="网站信息"
                description="备案和许可证信息"
                active={true}
              />
              <SettingsNavItem 
                href="/dashboard/settings/security" 
                icon={<Shield className="w-4 h-4" />}
                title="安全设置"
                description="用户权限和访问控制"
              />
              <SettingsNavItem 
                href="/dashboard/settings/notifications" 
                icon={<BellRing className="w-4 h-4" />}
                title="通知设置"
                description="系统通知和提醒配置"
              />
            </nav>
          </div>
        </div>
        
        {/* 设置内容区域 */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

interface SettingsNavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  active?: boolean;
}

function SettingsNavItem({ href, icon, title, description, active = false }: SettingsNavItemProps) {
  return (
    <a 
      href={href}
      className={`
        flex items-start p-3 rounded-lg transition-colors
        ${active 
          ? 'bg-primary/10 text-primary' 
          : 'hover:bg-muted text-foreground hover:text-primary'
        }
      `}
    >
      <div className={`mr-3 mt-0.5 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </a>
  );
}
