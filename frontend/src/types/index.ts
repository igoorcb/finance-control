export interface Account {
  id: string
  name: string
  type: 'corrente' | 'poupanca' | 'investimento' | 'carteira'
  bank?: string
  initialBalance: number
  currentBalance: number
  color: string
  icon: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  type: 'receita' | 'despesa'
  icon: string
  color: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  type: 'receita' | 'despesa' | 'transferencia'
  amount: number
  date: string
  description: string
  categoryId: string
  category?: Category
  accountId: string
  account?: Account
  status: 'pendente' | 'confirmada'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface DashboardSummary {
  totalBalance: number
  monthIncome: number
  monthExpenses: number
  monthBalance: number
}

export interface ExpenseByCategory {
  categoryId: string
  categoryName: string
  total: number
  color: string
}

export interface CreateAccountDto {
  name: string
  type: 'corrente' | 'poupanca' | 'investimento' | 'carteira'
  bank?: string
  initialBalance: number
  color?: string
  icon?: string
}

export interface CreateCategoryDto {
  name: string
  type: 'receita' | 'despesa'
  icon?: string
  color?: string
}

export interface CreateTransactionDto {
  type: 'receita' | 'despesa' | 'transferencia'
  amount: number
  date: string
  description: string
  categoryId: string
  accountId: string
  status?: 'pendente' | 'confirmada'
  notes?: string
}
