<template>
  <div class="coluna-info">

    <div class="card-cliente" :class="{ vazio: !clienteSelecionado }">
      <div v-if="!clienteSelecionado" class="card-placeholder">
        <i class="fas fa-user-circle"></i>
        <p>Nenhum cliente selecionado</p>
      </div>
      <div v-else>
        <div class="cliente-avatar">
          <i class="fas fa-user"></i>
        </div>
        <h3>{{ clienteSelecionado.nome }}</h3>
        <p class="veiculo-label"><i class="fas fa-car"></i> {{ clienteSelecionado.veiculo }}</p>
        <p class="telefone-label"><i class="fas fa-phone"></i> {{ clienteSelecionado.telefone }}</p>
        <div class="servico-ativo">
          <span class="badge-servico">{{ clienteSelecionado.servico }}</span>
        </div>
      </div>
    </div>