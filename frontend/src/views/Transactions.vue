<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { transactionsApi } from '../services/api'
import { formatCurrency, formatDate } from '../lib/utils'
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Transações (MVP Básico)</h3>
      <p class="text-gray-600">
        Visualização básica de transações. CRUD completo será implementado nas próximas iterações.
      </p>
    </div>
  </div>
</template>
