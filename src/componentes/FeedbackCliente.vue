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
        <i class="fas fa-save"></i> Salvar Feedb
        ck
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