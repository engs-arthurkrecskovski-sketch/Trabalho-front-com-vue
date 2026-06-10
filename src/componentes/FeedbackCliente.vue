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

      <button
        class="btn-feedback"
        @click="salvarFeedback"
        :disabled="!clienteSelecionado || notaFeedback === 0"
      >
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

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  clienteSelecionado: Object,
  feedbacks: Array,
})

const emit = defineEmits(['salvar-feedback'])

const notaFeedback = ref(0)
const hoverNota = ref(0)
const textoFeedback = ref('')

function salvarFeedback() {
  if (!props.clienteSelecionado || notaFeedback.value === 0) return
  emit('salvar-feedback', {
    cliente: props.clienteSelecionado.nome,
    nota: notaFeedback.value,
    texto: textoFeedback.value.trim(),
  })
  notaFeedback.value = 0
  textoFeedback.value = ''
}
</script>

<style scoped>
.coluna-info {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.card-cliente {
  background: #1c1e21;
  border-radius: 16px;
  border: 1px solid #2c2f33;
  padding: 1.8rem;
  text-align: center;
  transition: 0.3s;
}
.card-cliente.vazio { opacity: 0.5; }

.card-placeholder {
  color: #444;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.card-placeholder i { font-size: 3rem; }

.cliente-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(230, 57, 70, 0.15);
  border: 2px solid rgba(230, 57, 70, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: #e63946;
  margin: 0 auto 1rem;
}

.card-cliente h3 {
  color: white;
  font-size: 1.2rem;
  font-family: 'Chakra Petch', sans-serif;
  margin-bottom: 0.5rem;
}

.veiculo-label, .telefone-label {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.servico-ativo { margin-top: 1rem; }

.badge-servico {
  background: rgba(230, 57, 70, 0.15);
  color: #e63946;
  border: 1px solid rgba(230, 57, 70, 0.3);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.78rem;
  font-weight: 600;
}

.feedback-box {
  background: #1c1e21;
  border-radius: 16px;
  border: 1px solid #2c2f33;
  padding: 1.5rem;
}

.feedback-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.2rem;
  color: #f59e0b;
}
.feedback-header h3 { color: white; font-size: 0.95rem; }

.estrelas { display: flex; gap: 8px; margin-bottom: 1rem; }

.estrela {
  font-size: 1.4rem;
  color: #3e4247;
  cursor: pointer;
  transition: 0.2s;
}
.estrela.ativa, .estrela.hover { color: #f59e0b; transform: scale(1.15); }

.textarea-feedback {
  width: 100%;
  background: #25282c;
  border: 1px solid #3e4247;
  border-radius: 10px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  padding: 12px;
  outline: none;
  resize: none;
  transition: 0.3s;
  margin-bottom: 1rem;
  box-sizing: border-box;
}
.textarea-feedback:focus { border-color: #e63946; }

.btn-feedback {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #e63946, #c31520);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: 0.3s;
}
.btn-feedback:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-2px); }
.btn-feedback:disabled { opacity: 0.4; cursor: default; }

.feedbacks-salvos {
  background: #1c1e21;
  border-radius: 16px;
  border: 1px solid #2c2f33;
  padding: 1.2rem;
}

.feedbacks-salvos h4 {
  color: #aaa;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}
.feedbacks-salvos h4 i { color: #e63946; }

.feedback-item {
  padding: 12px;
  background: #25282c;
  border-radius: 10px;
  margin-bottom: 8px;
}

.fb-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.fb-topo strong { color: white; font-size: 0.85rem; }

.fb-estrelas { display: flex; gap: 3px; }
.fb-estrelas i { font-size: 0.7rem; color: #3e4247; }
.fb-estrelas i.lit { color: #f59e0b; }

.feedback-item p { color: #aaa; font-size: 0.82rem; margin-bottom: 6px; }
.fb-hora { color: #555; font-size: 0.72rem; }
</style>
