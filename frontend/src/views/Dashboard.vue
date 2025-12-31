<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { dashboardApi } from '../services/api'
import { formatCurrency } from '../lib/utils'
import { computed } from 'vue'

const currentDate = new Date()
const currentMonth = currentDate.getMonth() + 1
const currentYear = currentDate.getFullYear()

const { data: summary, isLoading: summaryLoading } = useQuery({
  queryKey: ['dashboard-summary', currentMonth, currentYear],
  queryFn: () => dashboardApi.getSummary(currentMonth, currentYear).then(res => res.data),
})

const { data: recentTransactions, isLoading: transactionsLoading } = useQuery({
  queryKey: ['recent-transactions'],
  queryFn: () => dashboardApi.getRecentTransactions(10).then(res => res.data),
})
</script>

<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-sm font-medium text-gray-600">Saldo Total</h3>
        <p v-if="summaryLoading" class="text-2xl font-bold text-gray-900 mt-2">Carregando...</p>
        <p v-else class="text-2xl font-bold text-gray-900 mt-2">
          {{ formatCurrency(summary?.totalBalance || 0) }}
        </p>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-sm font-medium text-gray-600">Receitas do Mês</h3>
        <p v-if="summaryLoading" class="text-2xl font-bold text-green-600 mt-2">Carregando...</p>
        <p v-else class="text-2xl font-bold text-green-600 mt-2">
          {{ formatCurrency(summary?.monthIncome || 0) }}
        </p>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-sm font-medium text-gray-600">Despesas do Mês</h3>
        <p v-if="summaryLoading" class="text-2xl font-bold text-red-600 mt-2">Carregando...</p>
        <p v-else class="text-2xl font-bold text-red-600 mt-2">
          {{ formatCurrency(summary?.monthExpenses || 0) }}
        </p>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-sm font-medium text-gray-600">Saldo do Mês</h3>
        <p v-if="summaryLoading" class="text-2xl font-bold mt-2"
           :class="(summary?.monthBalance || 0) >= 0 ? 'text-green-600' : 'text-red-600'">
          Carregando...
        </p>
        <p v-else class="text-2xl font-bold mt-2"
           :class="(summary?.monthBalance || 0) >= 0 ? 'text-green-600' : 'text-red-600'">
          {{ formatCurrency(summary?.monthBalance || 0) }}
        </p>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Últimas Transações</h3>

      <div v-if="transactionsLoading" class="text-center py-8 text-gray-500">
        Carregando transações...
      </div>

      <div v-else-if="!recentTransactions || recentTransactions.length === 0"
           class="text-center py-8 text-gray-500">
        Nenhuma transação encontrada
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="transaction in recentTransactions"
          :key="transaction.id"
          class="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
        >
          <div class="flex-1">
            <p class="font-medium text-gray-900">{{ transaction.description }}</p>
            <p class="text-sm text-gray-500">
              {{ transaction.category?.name }} • {{ transaction.account?.name }}
            </p>
          </div>
          <div class="text-right">
            <p
              :class="[
                'font-semibold',
                transaction.type === 'receita' ? 'text-green-600' : 'text-red-600',
              ]"
            >
              {{ transaction.type === 'receita' ? '+' : '-' }}
              {{ formatCurrency(transaction.amount) }}
            </p>
            <p class="text-sm text-gray-500">
              {{ new Date(transaction.date).toLocaleDateString('pt-BR') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
