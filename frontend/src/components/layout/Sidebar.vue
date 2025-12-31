<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  ArrowRightLeft,
  Wallet,
  Tags
} from 'lucide-vue-next'
import { computed } from 'vue'

const route = useRoute()

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Transações', path: '/transactions', icon: ArrowRightLeft },
  { name: 'Contas', path: '/accounts', icon: Wallet },
  { name: 'Categorias', path: '/categories', icon: Tags },
]

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <!-- Logo/Brand -->
    <div class="p-6 border-b border-gray-200">
      <h1 class="text-2xl font-bold text-gray-900">Finance App</h1>
      <p class="text-sm text-gray-500">Controle Financeiro</p>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
          isActive(item.path)
            ? 'bg-blue-50 text-blue-700 font-medium'
            : 'text-gray-700 hover:bg-gray-100',
        ]"
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>

    <!-- Footer Info -->
    <div class="p-4 border-t border-gray-200">
      <div class="text-xs text-gray-500 text-center">
        <p>Versão 1.0.0 (MVP)</p>
      </div>
    </div>
  </aside>
</template>
