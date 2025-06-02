'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import useSiteConfig from '@/lib/hooks/useSiteConfig';

export default function SiteConfigPage() {
  const { toast } = useToast();
  const { config, updateConfig } = useSiteConfig();
  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    footerText: '',
    beianNumber: ''
  });

  useEffect(() => {
    if (config) {
      setFormData({
        siteName: config.siteName || '',
        siteDescription: config.siteDescription || '',
        footerText: config.footerText || '',
        beianNumber: config.beianNumber || ''
      });
    }
  }, [config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateConfig(formData);
      toast({
        title: '成功',
        description: '网站配置已更新',
      });
    } catch (error) {
      toast({
        title: '错误',
        description: '更新配置失败',
        variant: 'destructive',
      });
    }
  };
}
