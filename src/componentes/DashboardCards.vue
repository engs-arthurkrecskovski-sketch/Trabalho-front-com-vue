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
import { store } from '../store/index.js'

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


<style scoped>
.dashboard-cards { display: flex; gap: 20px; flex-wrap: wrap; }

.card {
  background: #1c1e21;
  padding: 2rem 1.5rem;
  border-radius: 20px;
  flex: 1;
  min-width: 200px;
  text-align: center;
  position: relative;
  transition: 0.3s;
  border-bottom: 4px solid #3b82f6;
  cursor: help;
  opacity: 0;
  animation: cardsEntrada 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.card:nth-child(1) { animation-delay: 0.2s; }
.card:nth-child(2) { animation-delay: 0.4s; }
.card:nth-child(3) { animation-delay: 0.6s; }

.card-tooltip {
  display: none;
  position: absolute;
  bottom: 115%;
  left: 50%;
  transform: translateX(-50%);
  background: #2c2f33;
  color: #fff;
  padding: 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  text-align: left;
  border: 1px solid #e63946;
  z-index: 100;
  white-space: nowrap;
  pointer-events: none;
}
.card:hover .card-tooltip { display: block; }
.card-tooltip strong { display: block; margin-bottom: 4px; color: #e63946; }
.card-tooltip p { margin: 2px 0; font-size: 0.78rem; color: #ccc; }

.card-azul    { border-color: #3b82f6; }
.card-amarelo { border-color: #f59e0b; }
.card-verde   { border-color: #10b981; }

.card span {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 3rem;
  font-weight: 700;
}

@keyframes cardsEntrada {
  from { opacity: 0; transform: translateY(50px) rotateX(10deg); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }
}

@media (max-width: 768px) {
  .dashboard-cards { flex-direction: column; }
  .card { width: 100%; }
  .card-tooltip { display: none !important; }
}
</style>