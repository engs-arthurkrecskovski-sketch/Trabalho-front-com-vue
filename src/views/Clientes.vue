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

</style>