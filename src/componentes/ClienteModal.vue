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

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.modal-box {
  background: #1c1e21;
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  border-top: 4px solid #10b981;
}

.modal-icon { font-size: 3rem; color: #10b981; margin-bottom: 1rem; }

.modal-box h2 { color: white; font-family: 'Michroma', sans-serif; margin-bottom: 0.5rem; }
.modal-box p  { color: #aaa; margin-bottom: 1rem; }

.modal-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #25282c;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #ccc;
}

.modal-acoes { display: flex; gap: 10px; justify-content: center; }

.btn-modal-ok {
  padding: 0.8rem 1.5rem;
  background: #2c2f33;
  color: white;
  border: 1px solid #3e4247;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;
}
.btn-modal-ok:hover { background: #3e4247; }


</style>