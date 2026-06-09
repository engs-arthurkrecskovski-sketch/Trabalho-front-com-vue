<template>
  <div class="coluna-chat">

    <div class="selector-cliente">
      <label><i class="fas fa-user"></i> Cliente em Atendimento</label>
      <select :value="clienteSelecionado" @change="$emit('update:clienteSelecionado', $event.target.value === '' ? null : clientes.find(c => c.nome === $event.target.value))" >
        <option value="" disabled :selected="!clienteSelecionado">Selecione o cliente...</option>
        <option v-for="c in clientes" :key="c.nome" :value="c.nome">
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
          v-for="(msg, i) in mensagens"
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

                <div v-if="mensagens.length === 0" class="chat-vazio">
          <i class="fas fa-paper-plane"></i>
          <p>Nenhuma mensagem ainda. Inicie o atendimento!</p>
        </div>
      </template>
    </div>

    <div class="chat-input-area" :class="{ disabled: !clienteSelecionado }">
      <textarea
        :value="novaMensagem"
        @input="$emit('update:novaMensagem', $event.target.value)"
        placeholder="Digite uma mensagem para o cliente..."
        :disabled="!clienteSelecionado"
        @keydown.enter.prevent="$emit('enviar')"
        rows="2"
      ></textarea>
      <button
        class="btn-enviar"
        @click="$emit('enviar')"
        :disabled="!clienteSelecionado || !novaMensagem.trim()"
      >
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>

  </div>
</template>