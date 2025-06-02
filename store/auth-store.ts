import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { authAPI } from '@/utils/api';

interface User {
  id: string;
  username: string;
  role: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

type AuthPersist = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

type AuthStatePersist = Pick<AuthState, keyof AuthPersist>;

const persistOptions: PersistOptions<AuthState, AuthPersist> = {
  name: 'auth-storage', // 本地存储的键名
  partialize: (state) => ({
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated
  }),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 登录方法
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // 尝试使用API登录
          const response = await authAPI.login(username, password);
          
          // 保存令牌和用户信息
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            set({ 
              token: response.token, 
              user: response.user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            throw new Error('登录响应中没有找到令牌');
          }
        } catch (error) {
          // 检查是否是非登录模式（通过API配置查询）
          try {
            const config = await fetch('/api/config').then(res => res.json());
            
            if (config.auth_mode === 'noauth' && username === 'admin' && password === 'admin') {
              // 非登录模式下，使用默认admin账号
              set({
                token: 'dummy-token-for-noauth-mode',
                user: {
                  id: 'admin',
                  username: 'admin',
                  role: 'admin'
                },
                isAuthenticated: true,
                isLoading: false,
                error: null
              });
              return;
            }
          } catch (configError) {
            console.error('获取配置失败:', configError);
          }
          
          // 处理登录错误
          const errorMessage = error instanceof Error ? error.message : '登录失败';
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      // 登出方法
      logout: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      // 检查认证状态
      checkAuthStatus: async () => {
        // 获取本地存储的令牌
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null });
          return;
        }
        
        set({ isLoading: true });
        
        try {
          // 验证令牌是否有效
          const userData = await authAPI.checkAuth();
          
          if (userData) {
            set({ 
              user: userData, 
              isAuthenticated: true, 
              token, 
              isLoading: false 
            });
          } else {
            // 令牌无效
            localStorage.removeItem('auth_token');
            set({ user: null, token: null, isAuthenticated: false, isLoading: false });
          }
        } catch (error) {
          console.error('验证令牌失败:', error);
          localStorage.removeItem('auth_token');
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      }
    }),
    persistOptions
  )
);
