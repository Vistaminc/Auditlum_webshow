import axios from 'axios';
import yaml from 'js-yaml';
import { getErrorMessage } from '.';

// 动态导入，避免客户端直接导入Node.js模块
const isServer = typeof window === 'undefined';

// u521bu5efaAPIu5b9eu4f8b
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 异步加载配置
export const loadConfig = async () => {
  try {
    // 在浏览器环境下使用fetch加载配置
    if (!isServer) {
      const response = await fetch('/api/config');
      if (!response.ok) {
        throw new Error(`加载配置失败: ${response.statusText}`);
      }
      return await response.json();
    } 
    // 在服务器环境下返回默认配置 
    // 服务器端逻辑可以通过Next.js API路由来实现，而不是直接读取文件
    else {
      // 返回默认配置，服务端通过API路由来读取实际配置
      return {
        auth_mode: 'noauth',
        api: {
          base_url: 'http://localhost:8000/api',
          timeout: 30
        }
      };
    }
  } catch (error) {
    console.error('加载配置失败:', getErrorMessage(error));
    // 返回默认配置
    return {
      auth_mode: 'noauth',
      api: {
        base_url: 'http://localhost:8000/api',
        timeout: 30
      }
    };
  }
};

// u8bf7u6c42u62e6u622au5668
api.interceptors.request.use(
  async (config) => {
    // u8bfbu53d6u914du7f6e
    const appConfig = await loadConfig();
    
    // u66f4u65b0baseURLu548cu8d85u65f6u65f6u95f4
    if (appConfig.api?.base_url) {
      config.baseURL = appConfig.api.base_url;
    }
    
    if (appConfig.api?.timeout) {
      config.timeout = appConfig.api.timeout * 1000;
    }
    
    // u6dfbu52a0u8ba4u8bc1u4ee4u724cuff08u5982u679cu6709uff09
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// u54cdu5e94u62e6u622au5668
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // u5904u7406u9519u8befu54cdu5e94
    const errorMessage = error.response?.data?.detail || getErrorMessage(error);
    console.error(`APIu9519u8bef: ${errorMessage}`);
    
    // u5904u7406401u672au6388u6743u9519u8bef
    if (error.response?.status === 401) {
      // u6e05u9664u8ba4u8bc1u72b6u6001u5e76u91cdu5b9au5411u5230u767bu5f55u9875
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      
      // u5982u679cu5728u6d4fu89c8u5668u73afu5883u4e0bu6267u884c
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// APIu65b9u6cd5

// u8ba4u8bc1u76f8u5173
export const authAPI = {
  // u7528u6237u767bu5f55
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  
  // u68c0u67e5u767bu5f55u72b6u6001
  checkAuth: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  }
};

// u626bu63cfu76f8u5173
export const scanAPI = {
  // u542fu52a8u626bu63cf
  startScan: async (params: any) => {
    const response = await api.post('/scan', params);
    return response.data;
  },
  
  // u83b7u53d6u626bu63cfu72b6u6001
  getScanStatus: async (scanId: string) => {
    const response = await api.get(`/scan/${scanId}/status`);
    return response.data;
  },
  
  // u83b7u53d6u626bu63cfu6458u8981
  getScanSummary: async (scanId: string) => {
    const response = await api.get(`/scan/${scanId}/summary`);
    return response.data;
  },
  
  // u83b7u53d6u6f0fu6d1eu5217u8868
  getVulnerabilities: async (scanId: string, params: any = {}) => {
    const response = await api.get(`/scan/${scanId}/vulnerabilities`, { params });
    return response.data;
  }
};

// u7cfbu7edfu76f8u5173
export const systemAPI = {
  // u83b7u53d6u914du7f6e
  getConfig: async () => {
    const response = await api.get('/config');
    return response.data;
  },
  
  // u5065u5eb7u68c0u67e5
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;
