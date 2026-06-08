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

           <div class="chat-box" ref="chatBox">
            <div v-if="!clienteSelecionado" class="chat-vazio">
              <i class="fas fa-comment-slash"></i>
              <p>Selecione um cliente para iniciar o atendimento</p>
            </div>

            <template v-else>
              <div
                v-for="(msg, i) in mensagensAtivas"
                :key="i"
                class="msg-wrapper"
                :class="msg.tipo"
              >
                <div class="msg-bubble">
                  <span class="msg-autor">{{ msg.tipo === 'oficina' ? 'RealCars' : clienteSelecionado.nome }}</span>
                  <p>{{ msg.texto }}</p>
                  <span class="msg-hora">{{ msg.hora }}</span>
                </div>
                <div class="msg-avatar">
                  <i :class="msg.tipo === 'oficina' ? 'fas fa-tools' : 'fas fa-user'"></i>
                </div>
              </div>

              <div v-if="mensagensAtivas.length === 0" class="chat-vazio">
                <i class="fas fa-paper-plane"></i>
                <p>Nenhuma mensagem ainda. Inicie o atendimento!</p>
              </div>
            </template>
          </div>

          <div class="chat-input-area" :class="{ disabled: !clienteSelecionado }">
            <textarea
              v-model="novaMensagem"
              placeholder="Digite uma mensagem para o cliente..."
              :disabled="!clienteSelecionado"
              @keydown.enter.prevent="enviarMensagem"
              rows="2"
            ></textarea>
            <button class="btn-enviar" @click="enviarMensagem" :disabled="!clienteSelecionado || !novaMensagem.trim()">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>

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

            <div class="feedback-box">
            <div class="feedback-header">
              <i class="fas fa-star"></i>
              <h3>Registrar Feedback</h3>
            </div>

            <div class="estrelas">
              <span
                v-for="n in 5"
                :key="n"
                class="estrela"
                :class="{ ativa: n <= notaFeedback, hover: n <= hoverNota }"
                @click="notaFeedback = n"
                @mouseenter="hoverNota = n"
                @mouseleave="hoverNota = 0"
              >
                <i class="fas fa-star"></i>
              </span>
            </div>

            <textarea
              v-model="textoFeedback"
              placeholder="Observações sobre o atendimento..."
              rows="3"
              class="textarea-feedback"
            ></textarea>

            <button class="btn-feedback" @click="salvarFeedback" :disabled="!clienteSelecionado || notaFeedback === 0">
              <i class="fas fa-save"></i> Salvar Feedback
            </button>
          </div>

          <div class="feedbacks-salvos" v-if="feedbacks.length > 0">
            <h4><i class="fas fa-clipboard-list"></i> Feedbacks Recentes</h4>
            <div v-for="(fb, i) in feedbacks" :key="i" class="feedback-item">
              <div class="fb-topo">
                <strong>{{ fb.cliente }}</strong>
                <div class="fb-estrelas">
                  <i v-for="n in 5" :key="n" class="fas fa-star" :class="{ lit: n <= fb.nota }"></i>
                </div>
              </div>
              <p v-if="fb.texto">{{ fb.texto }}</p>
              <span class="fb-hora">{{ fb.hora }}</span>
            </div>
          </div>