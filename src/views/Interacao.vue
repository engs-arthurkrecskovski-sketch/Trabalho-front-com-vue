<template>
  <main>
    <div class="interacao-wrapper">

      <div class="header-page">
        <div class="header-left">
          <i class="fas fa-comments header-icon"></i>
          <div>
            <h1>Interação com Cliente</h1>
            <p>Envie mensagens, registre feedbacks e acompanhe o atendimento</p>
          </div>
        </div>
        <div class="status-badge">
          <i class="fas fa-circle"></i> Atendimento Ativo
        </div>
      </div>

      <div class="interacao-grid">

        <div class="coluna-chat">

          <div class="selector-cliente">
            <label><i class="fas fa-user"></i> Cliente em Atendimento</label>
            <select v-model="clienteSelecionado" @change="trocarCliente">
              <option value="" disabled>Selecione o cliente...</option>
              <option v-for="c in clientes" :key="c.nome" :value="c">
                {{ c.nome }} — {{ c.veiculo }}
              </option>
            </select>
          </div>