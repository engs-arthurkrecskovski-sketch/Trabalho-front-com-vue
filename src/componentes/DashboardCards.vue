<template>
  <div class="dashboard-cards">
    <div
      v-for="card in cards"
      :key="card.label"
      class="card"
      :class="card.colorClass"
    >
      <i :class="card.icon + ' card-icon'"></i>
      <h3>{{ card.label }}</h3>
      <span>{{ card.value }}</span>

      <div v-if="card.tooltip.length" class="card-tooltip">
        <strong>{{ card.label.toUpperCase() }}</strong>
        <p v-for="item in card.tooltip" :key="item">• {{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../../store/index.js'

const totalClientes  = computed(() => store.clientes.length)
const totalPendentes = computed(() =>
  store.agendamentos.filter(a => a.status === 'Pendente').length
)
const totalConcluidos = computed(() =>
  store.agendamentos.filter(a => a.status === 'Concluído').length
)

const cards = computed(() => [
  {
    label: 'Total Clientes',
    value: String(totalClientes.value).padStart(2, '0'),
    icon: 'fas fa-users',
    colorClass: 'card-azul',
    tooltip: store.clientes.slice(0, 3).map(c => c.nome),
  },
  {
    label: 'Pendentes',
    value: String(totalPendentes.value).padStart(2, '0'),
    icon: 'fas fa-clock',
    colorClass: 'card-amarelo',
    tooltip: store.agendamentos
      .filter(a => a.status === 'Pendente')
      .slice(0, 3)
      .map(a => {
        const veiculo = store.clientes.find(c => c.nome === a.cliente)?.veiculo ?? a.cliente
        return `${veiculo} (${a.servico})`
      }),
  },
  {
    label: 'Concluídos',
    value: String(totalConcluidos.value).padStart(2, '0'),
    icon: 'fas fa-check-circle',
    colorClass: 'card-verde',
    tooltip: store.agendamentos
      .filter(a => a.status === 'Concluído')
      .slice(0, 3)
      .map(a => {
        const veiculo = store.clientes.find(c => c.nome === a.cliente)?.veiculo ?? a.cliente
        return `${veiculo} (${a.servico})`
      }),
  },
])
</script>
