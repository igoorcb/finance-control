<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { Plus } from 'lucide-vue-next'

const route = useRoute()

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/transactions': 'Transações',
  '/accounts': 'Contas',
  '/categories': 'Categorias',
}

const pageTitle = computed(() => pageTitles[route.path] || 'Finance App')
</script>

<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Page Title -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-900">{{ pageTitle }}</h2>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus :size="20" />
          <span>Nova Transação</span>
        </button>
      </div>
    </div>
  </header>
</template>
