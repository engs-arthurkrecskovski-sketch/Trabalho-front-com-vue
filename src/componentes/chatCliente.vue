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

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  clientes: Array,
  clienteSelecionado: Object,
  mensagens: Array,
  novaMensagem: String,
})

defineEmits(['update:clienteSelecionado', 'update:novaMensagem', 'enviar'])

const chatBox = ref(null)

watch(() => props.mensagens?.length, () => {
  if (chatBox.value) {
    setTimeout(() => {
      chatBox.value.scrollTop = chatBox.value.scrollHeight
    }, 50)
  }
})
</script>

<style scoped>
.coluna-chat {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-box {
  background: #1c1e21;
  border-radius: 16px;
  border: 1px solid #2c2f33;
  min-height: 420px;
  max-height: 420px;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scroll-behavior: smooth;
}

.chat-box::-webkit-scrollbar { width: 5px; }
.chat-box::-webkit-scrollbar-thumb { background: #3e4247; border-radius: 10px; }

.chat-vazio {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #444;
  font-size: 0.9rem;
}
.chat-vazio i { font-size: 2.5rem; }

.msg-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}
.msg-wrapper.oficina { flex-direction: row-reverse; }

.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2c2f33;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
  color: #888;
}
.msg-wrapper.oficina .msg-avatar {
  background: rgba(230, 57, 70, 0.2);
  color: #e63946;
}

.msg-bubble {
  max-width: 70%;
  background: #25282c;
  border-radius: 16px 16px 16px 4px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.msg-wrapper.oficina .msg-bubble {
  background: rgba(230, 57, 70, 0.15);
  border-radius: 16px 16px 4px 16px;
  border: 1px solid rgba(230, 57, 70, 0.2);
}
