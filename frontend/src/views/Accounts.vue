<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { accountsApi } from '@/services/api'
import { formatCurrency } from '@/lib/utils'
import type { Account, CreateAccountDto } from '@/types'
import { Plus, Edit, Trash2, Wallet } from 'lucide-vue-next'

import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Select from '@/components/ui/Select.vue'

const queryClient = useQueryClient()

// Fetch accounts
const { data: accounts, isLoading } = useQuery({
  queryKey: ['accounts'],
  queryFn: () => accountsApi.getAll().then(res => res.data),
})

// Modal state
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const editingAccount = ref<Account | null>(null)
const deletingAccount = ref<Account | null>(null)

// Form state
const form = ref<CreateAccountDto>({
  name: '',
  type: 'corrente',
  bank: '',
  initialBalance: 0,
  color: '#3B82F6',
  icon: 'wallet',
})

const formErrors = ref<Record<string, string>>({})

// Account type options
const accountTypes = [
  { value: 'corrente', label: 'Conta Corrente' },
  { value: 'poupanca', label: 'Poupança' },
  { value: 'investimento', label: 'Investimento' },
  { value: 'carteira', label: 'Carteira' },
]

// Color options
const colorOptions = [
  { value: '#3B82F6', label: 'Azul' },
  { value: '#10B981', label: 'Verde' },
  { value: '#F59E0B', label: 'Amarelo' },
  { value: '#EF4444', label: 'Vermelho' },
  { value: '#8B5CF6', label: 'Roxo' },
  { value: '#EC4899', label: 'Rosa' },
]

// Create mutation
const createMutation = useMutation({
  mutationFn: (data: CreateAccountDto) => accountsApi.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] })
    closeModal()
  },
})

// Update mutation
const updateMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: Partial<CreateAccountDto> }) =>
    accountsApi.update(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] })
    closeModal()
  },
})

// Delete mutation
const deleteMutation = useMutation({
  mutationFn: (id: string) => accountsApi.delete(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] })
    isDeleteModalOpen.value = false
    deletingAccount.value = null
  },
})

// Functions
const openCreateModal = () => {
  editingAccount.value = null
  form.value = {
    name: '',
    type: 'corrente',
    bank: '',
    initialBalance: 0,
    color: '#3B82F6',
    icon: 'wallet',
  }
  formErrors.value = {}
  isModalOpen.value = true
}

const openEditModal = (account: Account) => {
  editingAccount.value = account
  form.value = {
    name: account.name,
    type: account.type as any,
    bank: account.bank || '',
    initialBalance: account.initialBalance,
    color: account.color,
    icon: account.icon,
  }
  formErrors.value = {}
  isModalOpen.value = true
}

const openDeleteModal = (account: Account) => {
  deletingAccount.value = account
  isDeleteModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingAccount.value = null
  formErrors.value = {}
}

const validateForm = (): boolean => {
  const errors: Record<string, string> = {}

  if (!form.value.name.trim()) {
    errors.name = 'Nome é obrigatório'
  }

  if (!form.value.type) {
    errors.type = 'Tipo é obrigatório'
  }

  if (form.value.initialBalance < 0) {
    errors.initialBalance = 'Saldo inicial não pode ser negativo'
  }

  formErrors.value = errors
  return Object.keys(errors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return

  if (editingAccount.value) {
    updateMutation.mutate({
      id: editingAccount.value.id,
      data: form.value,
    })
  } else {
    createMutation.mutate(form.value)
  }
}

const handleDelete = () => {
  if (deletingAccount.value) {
    deleteMutation.mutate(deletingAccount.value.id)
  }
}

const modalTitle = computed(() => {
  return editingAccount.value ? 'Editar Conta' : 'Nova Conta'
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900">Contas</h2>
        <p class="text-gray-600 mt-1">Gerencie suas contas bancárias e carteiras</p>
      </div>
      <Button @click="openCreateModal">
        <Plus :size="20" class="mr-2" />
        Nova Conta
      </Button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-12">
      <p class="text-gray-500">Carregando contas...</p>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!accounts || accounts.length === 0"
      class="text-center py-12 bg-white rounded-lg border border-gray-200"
    >
      <Wallet :size="48" class="mx-auto text-gray-400 mb-4" />
      <p class="text-gray-600 mb-4">Nenhuma conta cadastrada</p>
      <Button @click="openCreateModal">
        <Plus :size="20" class="mr-2" />
        Criar primeira conta
      </Button>
    </div>

    <!-- Accounts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="account in accounts"
        :key="account.id"
        class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
      >
        <!-- Account Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div
              :style="{ backgroundColor: account.color }"
              class="w-12 h-12 rounded-lg flex items-center justify-center"
            >
              <Wallet :size="24" class="text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ account.name }}</h3>
              <p class="text-sm text-gray-500">{{ account.bank || account.type }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button
              @click="openEditModal(account)"
              class="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit :size="18" />
            </button>
            <button
              @click="openDeleteModal(account)"
              class="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 :size="18" />
            </button>
          </div>
        </div>

        <!-- Balance -->
        <div class="mb-2">
          <p class="text-sm text-gray-600">Saldo Atual</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(account.currentBalance) }}
          </p>
        </div>

        <!-- Stats -->
        <div class="pt-4 border-t border-gray-100">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Saldo Inicial</span>
            <span class="font-medium">{{ formatCurrency(account.initialBalance) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Modal :open="isModalOpen" :title="modalTitle" @close="closeModal">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Name -->
        <div>
          <Label for="name" required>Nome da Conta</Label>
          <Input
            id="name"
            v-model="form.name"
            placeholder="Ex: Conta Corrente"
            :error="formErrors.name"
          />
        </div>

        <!-- Type -->
        <div>
          <Label for="type" required>Tipo</Label>
          <Select
            id="type"
            v-model="form.type"
            :options="accountTypes"
            :error="formErrors.type"
          />
        </div>

        <!-- Bank -->
        <div>
          <Label for="bank">Banco</Label>
          <Input
            id="bank"
            v-model="form.bank"
            placeholder="Ex: Banco do Brasil"
          />
        </div>

        <!-- Initial Balance -->
        <div>
          <Label for="initialBalance" required>Saldo Inicial</Label>
          <Input
            id="initialBalance"
            v-model.number="form.initialBalance"
            type="number"
            step="0.01"
            placeholder="0.00"
            :error="formErrors.initialBalance"
          />
        </div>

        <!-- Color -->
        <div>
          <Label for="color">Cor</Label>
          <Select
            id="color"
            v-model="form.color"
            :options="colorOptions"
          />
        </div>
      </form>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button variant="outline" @click="closeModal">
            Cancelar
          </Button>
          <Button
            @click="handleSubmit"
            :disabled="createMutation.isPending.value || updateMutation.isPending.value"
          >
            {{ editingAccount ? 'Salvar' : 'Criar' }}
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal
      :open="isDeleteModalOpen"
      title="Excluir Conta"
      @close="isDeleteModalOpen = false"
    >
      <p class="text-gray-600">
        Tem certeza que deseja excluir a conta
        <strong>{{ deletingAccount?.name }}</strong>?
        Esta ação não pode ser desfeita.
      </p>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button variant="outline" @click="isDeleteModalOpen = false">
            Cancelar
          </Button>
          <Button
            variant="destructive"
            @click="handleDelete"
            :disabled="deleteMutation.isPending.value"
          >
            Excluir
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>
