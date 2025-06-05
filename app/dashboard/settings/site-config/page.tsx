'use client';

import type { FormEvent } from 'react';
import type { JSX } from 'react';

export default function Page(): JSX.Element {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: 实现表单提交逻辑
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">网站配置</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
              网站名称
            </label>
            <input
              id="siteName"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="输入网站名称"
            />
          </div>
          
          <div>
            <label htmlFor="siteDesc" className="block text-sm font-medium text-gray-700">
              网站描述
            </label>
            <input
              id="siteDesc"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="输入网站描述"
            />
          </div>
          
          <div>
            <label htmlFor="footerText" className="block text-sm font-medium text-gray-700">
              页脚文本
            </label>
            <input
              id="footerText"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="输入页脚文本"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            保存配置
          </button>
        </form>
      </div>
    </main>
  );
}
