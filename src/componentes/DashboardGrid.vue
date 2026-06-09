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
