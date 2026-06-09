<template>
  <div v-if="modalAberto" class="modal-overlay" @click.self="fecharModal">
    <div class="modal-box">
      <i class="fas fa-check-circle modal-icon"></i>
      <h2>Cliente Cadastrado!</h2>
      <p><strong>{{ ultimoCadastro.nome }}</strong> foi adicionado com sucesso.</p>
      <div class="modal-info">
        <span><i class="fas fa-car"></i> {{ ultimoCadastro.veiculo }}</span>
        <span><i class="fas fa-phone"></i> {{ ultimoCadastro.telefone }}</span>
      </div>
      <div class="modal-acoes">
        <button class="btn-modal-ok" @click="fecharModal">OK</button>
        <RouterLink to="/agendamento" class="btn-modal-agendar">
          <i class="fas fa-calendar-plus"></i> Agendar Serviço
        </RouterLink>
      </div>
    </div>
  </div>
</template>


<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  modalAberto: Boolean,
  ultimoCadastro: Object,
})

const emit = defineEmits(['fechar'])

function fecharModal() {
  emit('fechar')
}
</script>