<template>
  <main>
    <div class="interacao-wrapper">

      <InteracaoHeader />

      <div class="interacao-grid">

        <ChatCliente
          :clientes="clientes"
          v-model:clienteSelecionado="clienteSelecionado"
          v-model:novaMensagem="novaMensagem"
          :mensagens="mensagensAtivas"
          @enviar="enviarMensagem"
          @trocar="trocarCliente"
        />

        <FeedbackCliente
          :clienteSelecionado="clienteSelecionado"
          :feedbacks="feedbacks"
          @salvar-feedback="salvarFeedback"
        />

      </div>
    </div>

    <div class="toast" :class="{ show: toastVisivel }">
      <i class="fas fa-check-circle"></i> {{ toastMsg }}
    </div>
  </main>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { store } from '../store/index.js'

import InteracaoHeader from '../components/InteracaoHeader.vue'
import ChatCliente     from '../components/ChatCliente.vue'
import FeedbackCliente from '../components/FeedbackCliente.vue'

const clientes = computed(() => store.clientes)

const clienteSelecionado = ref(null)
const novaMensagem = ref('')
const historicoMensagens = reactive({})

const mensagensAtivas = computed(() => {
  if (!clienteSelecionado.value) return []
  return historicoMensagens[clienteSelecionado.value.nome] || []
})

function trocarCliente() {
  const chave = clienteSelecionado.value?.nome
  if (chave && !historicoMensagens[chave]) {
    historicoMensagens[chave] = [
      {
        tipo: 'oficina',
        texto: `Olá, ${clienteSelecionado.value.nome}! Seu veículo está em análise. Entraremos em contato em breve.`,
        hora: horaAtual(),
      }
    ]
  }
}

function enviarMensagem() {
  if (!clienteSelecionado.value || !novaMensagem.value.trim()) return
  const chave = clienteSelecionado.value.nome
  if (!historicoMensagens[chave]) historicoMensagens[chave] = []
  historicoMensagens[chave].push({
    tipo: 'oficina',
    texto: novaMensagem.value.trim(),
    hora: horaAtual(),
  })
  novaMensagem.value = ''
}

const feedbacks = ref([])
const toastVisivel = ref(false)
const toastMsg = ref('')

function salvarFeedback(dados) {
  feedbacks.value.unshift({
    ...dados,
    hora: horaAtual(),
  })
  mostrarToast('Feedback salvo com sucesso!')
}

function mostrarToast(msg) {
  toastMsg.value = msg
  toastVisivel.value = true
  setTimeout(() => { toastVisivel.value = false }, 3000)
}

function horaAtual() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
main {
  padding: 2.5rem;
  min-height: 100vh;
}

.interacao-wrapper { max-width: 1400px; margin: 0 auto; }

.interacao-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1.5rem;
  animation: entrar 0.7s ease;
}

@keyframes entrar {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #10b981;
  color: white;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 9999;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
}
.toast.show { transform: translateY(0); opacity: 1; }

@media (max-width: 1100px) {
  .interacao-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  main { padding: 1.2rem; padding-top: 140px; }
}
</style>