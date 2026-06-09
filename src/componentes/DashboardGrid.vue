<template>
  <div class="dashboard-grid-bottom">

    <div class="content-box">
      <div class="box-header">
        <i class="fas fa-list-ul"></i>
        <h3>Serviços em Destaque</h3>
      </div>

      <div v-if="servicosDestaque.length === 0" class="vazio-msg">
        <i class="fas fa-calendar-times"></i>
        <p>Nenhum serviço registrado ainda.</p>
        <small>Cadastre um cliente e agende um serviço para visualizar aqui.</small>
      </div>

      <div
        v-for="servico in servicosDestaque"
        :key="servico.id"
        class="fila-item"
      >
        <div class="info">
          <strong>{{ servico.veiculo }}</strong>
          <span>{{ servico.servico }}</span>
        </div>
        <span class="badge" :class="servico.badgeClass">{{ servico.status }}</span>
      </div>
    </div>

    <div class="content-box box-small">
      <div class="box-header">
        <i class="fas fa-bolt"></i>
        <h3>Ações Rápidas</h3>
      </div>
      <div class="atalhos">
        <RouterLink to="/clientes" class="btn-atalho">
          <i class="fas fa-user-plus"></i> Novo Cliente
        </RouterLink>
        <RouterLink to="/agendamento" class="btn-atalho">
          <i class="fas fa-calendar-plus"></i> Agendar
        </RouterLink>

        <div class="status-oficina">
          <p><i class="fas fa-circle" style="color: #10b981;"></i> Oficina em Operação</p>
          <small>
            {{ store.clientes.length > 0
              ? `${store.clientes.length} cliente(s) cadastrado(s)`
              : 'Nenhum cliente cadastrado ainda' }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { store } from '../../store/index.js'

const servicosDestaque = computed(() =>
  store.agendamentos.slice(0, 5).map((ag, i) => ({
    id: i,
    veiculo: store.clientes.find(c => c.nome === ag.cliente)?.veiculo ?? ag.cliente,
    servico: ag.servico,
    status:  ag.status === 'Concluído' ? 'CONCLUÍDO' : 'PENDENTE',
    badgeClass: ag.status === 'Concluído' ? 'badge-verde' : 'badge-amarelo',
  }))
)
</script>

<style scoped>
.dashboard-grid-bottom {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 25px;
  margin-top: 30px;
  opacity: 0;
  animation: conteudoEntrada 1s ease forwards;
  animation-delay: 0.8s;
}

.content-box {
  background: #1c1e21;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #2c2f33;
}

.box-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #e63946;
}
.box-header h3 { color: white; font-size: 1rem; }

.vazio-msg {
  text-align: center;
  padding: 2rem 1rem;
  color: #555;
}
.vazio-msg i { font-size: 2rem; margin-bottom: 0.5rem; color: #333; display: block; }
.vazio-msg p { color: #666; font-size: 0.9rem; margin-bottom: 4px; }
.vazio-msg small { font-size: 0.78rem; color: #444; }

.fila-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #25282c;
  border-radius: 12px;
  margin-bottom: 10px;
}

.info { display: flex; flex-direction: column; }
.info strong { color: white; font-size: 0.9rem; }
.info span   { color: #888; font-size: 0.8rem; }

.badge { padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; }
.badge-amarelo { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.badge-azul    { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
.badge-verde   { background: rgba(16, 185, 129, 0.2); color: #10b981; }

.atalhos { display: flex; flex-direction: column; gap: 10px; }

.btn-atalho {
  background: #2c2f33;
  color: white;
  text-decoration: none;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  font-size: 0.9rem;
  border: 1px solid #3e4247;
  transition: 0.3s;
}
.btn-atalho:hover { background: #e63946; }

.status-oficina {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #2c2f33;
  font-size: 0.85rem;
}

@keyframes conteudoEntrada {
  from { opacity: 0; transform: scale(0.95) translateY(40px); filter: blur(4px); }
  to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}

@media (max-width: 1100px) {
  .dashboard-grid-bottom { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .dashboard-grid-bottom { grid-template-columns: 1fr; }
}
</style>