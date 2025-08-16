'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { api } from './api'

interface User {
  id: string
  org_id: string
  email: string
  first_name?: string
  last_name?: string
  role: 'ADMIN' | 'ANALYST'
  status: 'ACTIVE' | 'INACTIVE'
}

interface Org {
  id: string
  name: string
  domain?: string
  settings: Record<string, any>
}

interface AuthContextType {
  user: User | null
  org: Org | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [org, setOrg] = useState<Org | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      setToken(storedToken)
      // Verify token and get user data
      verifyToken(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data.user)
      setOrg(response.data.org)
      setToken(token)
    } catch (error) {
      // Token is invalid, remove it
      localStorage.removeItem('auth_token')
      setToken(null)
      setUser(null)
      setOrg(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token: newToken, user: userData, org: orgData } = response.data
      
      localStorage.setItem('auth_token', newToken)
      setToken(newToken)
      setUser(userData)
      setOrg(orgData)
      
      router.push('/dashboard')
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
    setOrg(null)
    router.push('/login')
  }

  const value = {
    user,
    org,
    token,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}