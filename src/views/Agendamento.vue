<template>
  <main>
    <div class="agendamento-content">
     
      <div class="header-page">
        <i class="fas fa-calendar-plus header-icon"></i>
        <h1>Novo Agendamento</h1>
        <p>Reserve o horário para o serviço</p>
      </div>

     
      <div class="box-agendar">

        <div class="form-group">
          <label><i class="fas fa-user"></i> Cliente Selecionado</label>
         
          <select v-model="form.cliente" :class="{ 'input-erro': erros.cliente }">
            <option value="" disabled>Selecione um cliente...</option>
            <!-- v-for renderiza dinamicamente a lista de clientes do store -->
            <option v-for="c in clientesDisponiveis" :key="c.nome" :value="c.nome">
              {{ c.nome }} ({{ c.veiculo }})
            </option>
          </select>
          <span v-if="erros.cliente" class="msg-erro">{{ erros.cliente }}</span>
         
          <span v-if="clientesDisponiveis.length === 0" class="msg-aviso">
            <i class="fas fa-info-circle"></i>
            Nenhum cliente cadastrado.
            <RouterLink to="/clientes">Cadastrar agora</RouterLink>
          </span>
        </div>