export interface CreateAccountDto {
  name: string;
  type: 'corrente' | 'poupanca' | 'investimento' | 'carteira';
  bank?: string;
  initialBalance: number;
  color?: string;
  icon?: string;
}

export interface UpdateAccountDto extends Partial<CreateAccountDto> {
  currentBalance?: number;
  isActive?: boolean;
}

export interface CreateCategoryDto {
  name: string;
  type: 'receita' | 'despesa';
  icon?: string;
  color?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  isActive?: boolean;
}

export interface CreateTransactionDto {
  type: 'receita' | 'despesa' | 'transferencia';
  amount: number;
  date: string;
  description: string;
  categoryId: string;
  accountId: string;
  status?: 'pendente' | 'confirmada';
  notes?: string;
}

export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  accountId?: string;
  type?: string;
  status?: string;
}

export interface DashboardSummary {
  totalBalance: number;
  monthIncome: number;
  monthExpenses: number;
  monthBalance: number;
}

export interface ExpenseByCategory {
  categoryId: string;
  categoryName: string;
  total: number;
  color: string;
}
