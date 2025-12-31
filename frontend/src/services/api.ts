import axios from 'axios'
import type {
  Account,
  Category,
  Transaction,
  DashboardSummary,
  ExpenseByCategory,
  CreateAccountDto,
  CreateCategoryDto,
  CreateTransactionDto,
} from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptors para log em desenvolvimento
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`)
    return config
  })

  api.interceptors.response.use(
    (response) => {
      console.log(`[API] Response:`, response.status, response.data)
      return response
    },
    (error) => {
      console.error(`[API] Error:`, error.response?.data || error.message)
      return Promise.reject(error)
    }
  )
}

// Accounts
export const accountsApi = {
  getAll: () => api.get<Account[]>('/accounts'),
  getById: (id: string) => api.get<Account>(`/accounts/${id}`),
  create: (data: CreateAccountDto) => api.post<Account>('/accounts', data),
  update: (id: string, data: Partial<CreateAccountDto>) =>
    api.put<Account>(`/accounts/${id}`, data),
  delete: (id: string) => api.delete(`/accounts/${id}`),
}

// Categories
export const categoriesApi = {
  getAll: () => api.get<Category[]>('/categories'),
  getById: (id: string) => api.get<Category>(`/categories/${id}`),
  create: (data: CreateCategoryDto) => api.post<Category>('/categories', data),
  update: (id: string, data: Partial<CreateCategoryDto>) =>
    api.put<Category>(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
}

// Transactions
export const transactionsApi = {
  getAll: (filters?: {
    startDate?: string
    endDate?: string
    categoryId?: string
    accountId?: string
    type?: string
    status?: string
  }) => api.get<Transaction[]>('/transactions', { params: filters }),
  getById: (id: string) => api.get<Transaction>(`/transactions/${id}`),
  create: (data: CreateTransactionDto) => api.post<Transaction>('/transactions', data),
  update: (id: string, data: Partial<CreateTransactionDto>) =>
    api.put<Transaction>(`/transactions/${id}`, data),
  delete: (id: string) => api.delete(`/transactions/${id}`),
}

// Dashboard
export const dashboardApi = {
  getSummary: (month: number, year: number) =>
    api.get<DashboardSummary>('/dashboard/summary', { params: { month, year } }),
  getExpensesByCategory: (month: number, year: number) =>
    api.get<ExpenseByCategory[]>('/dashboard/expenses-by-category', { params: { month, year } }),
  getRecentTransactions: (limit: number = 10) =>
    api.get<Transaction[]>('/dashboard/recent-transactions', { params: { limit } }),
}

export default api
