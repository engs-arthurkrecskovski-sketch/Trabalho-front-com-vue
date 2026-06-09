<template>
    <main>
    <div class="form-container">
        <div class="header-content">
            <i class="fas fa-user-plus header-icon"></i>
            <h1>Cadastrar Cliente</h1>
            <p>preencha os dados para iniciar um novo atendimento premium</p>
        </div>

        <ClienteForm @cadastrado="aoCadastrar" />
      <ClienteModal
        :modal-aberto="modalAberto"
        :ultimo-cadastro="ultimoCadastro"
        @fechar="fecharModal"
      />

      <ClienteLista />
    </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import ClienteForm from '../components/clientes/ClienteForm.vue'
import ClienteModal from '../components/clientes/ClienteModal.vue'
import ClienteLista from '../components/clientes/ClienteLista.vue'

const modalAberto    = ref(false)
const ultimoCadastro = ref({})

function aoCadastrar(novoCliente) {
  ultimoCadastro.value = novoCliente
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
}
</script>


<style scoped>

.form-container {
  width: min(520px, 100%);
  animation: fadeIn 0.8s ease-in-out;
}
.header-content {
  text-align: center;
  margin-bottom: 2.5rem;
}

.header-icon {
  font-size: 3rem;
  color: #e63946;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 10px rgba(230, 57, 70, 0.3));
}
.header-content h1 {
  color: white;
  font-size: 2.5rem;
  font-family: 'Michroma', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-content p { color: #aaa; font-weight: 300; font-size: 1.1rem; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (max-width: 768px) {
  .header-content h1 { font-size: 2rem; }
}

</style>