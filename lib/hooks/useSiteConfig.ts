import useSWR from 'swr';
import type { SiteConfig } from '@/app/api/site-config/route';

const fetcher = (url: string) => fetch(url).then(res => res.json());

/**
 * 网站配置 Hook
 * 用于获取网站备案信息等配置
 */
export function useSiteConfig() {
  const { data, error, isLoading, mutate } = useSWR<SiteConfig>('/api/site-config', fetcher);

  /**
   * 更新网站配置
   * @param config 新的配置数据（部分或全部字段）
   */
  const updateConfig = async (config: Partial<SiteConfig>) => {
    try {
      const response = await fetch('/api/site-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || '更新配置失败');
      }
      
      // 更新本地缓存数据
      mutate();
      return result;
    } catch (error) {
      console.error('更新网站配置失败:', error);
      throw error;
    }
  };

  return {
    config: data,
    isLoading,
    error,
    updateConfig,
  };
}
