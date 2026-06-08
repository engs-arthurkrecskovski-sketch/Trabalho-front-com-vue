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

         <div class="form-group">
          <label><i class="fas fa-oil-can"></i> Tipo de Serviço</label>
          <select v-model="form.servico" :class="{ 'input-erro': erros.servico }">
            <option value="" disabled>Selecione o serviço...</option>
           
            <option v-for="s in tiposServico" :key="s" :value="s">{{ s }}</option>
          </select>
          <span v-if="erros.servico" class="msg-erro">{{ erros.servico }}</span>
        </div>

         <div class="form-row">
          <div class="form-group">
            <label><i class="fas fa-calendar-day"></i> Data</label>
            <input v-model="form.data" type="date" :min="dataMinima" :class="{ 'input-erro': erros.data }" />
            <span v-if="erros.data" class="msg-erro">{{ erros.data }}</span>
          </div>
          <div class="form-group">
            <label><i class="fas fa-clock"></i> Horário</label>
            <input v-model="form.hora" type="time" :class="{ 'input-erro': erros.hora }" />
            <span v-if="erros.hora" class="msg-erro">{{ erros.hora }}</span>
          </div>
        </div>

         <div class="form-group">
          <label><i class="fas fa-comment-dots"></i> Observações</label>
          <textarea
            v-model="form.observacoes"
            rows="3"
            placeholder="Detalhes adicionais sobre o veículo ou serviço..."
          ></textarea>
        </div>

         
        <button class="btn-confirmar" @click="confirmarAgendamento">
          FINALIZAR AGENDAMENTO <i class="fas fa-check"></i>
        </button>
      </div>