<template>
  <div class="box-cadastro">
    <div class="form-group">
      <label><i class="fas fa-user"></i> Nome Completo</label>
      <input
        v-model="form.nome"
        type="text"
        placeholder="Ex: João Silva"
        :class="{ 'input-erro': erros.nome }"
        @input="limparErro('nome')"
      />
      <span v-if="erros.nome" class="msg-erro">{{ erros.nome }}</span>
    </div>

     <div class="form-group">
      <label><i class="fas fa-car"></i> Veículo e Placa</label>
      <input
        v-model="form.veiculo"
        type="text"
        placeholder="Ex: Corolla - ABC1234"
        :class="{ 'input-erro': erros.veiculo }"
        @input="limparErro('veiculo')"
      />
      <span v-if="erros.veiculo" class="msg-erro">{{ erros.veiculo }}</span>
    </div>

    <div class="form-group">
      <label><i class="fas fa-phone"></i> Telefone de Contato</label>
      <input
        v-model="form.telefone"
        type="text"
        placeholder="(42) 99999-9999"
        :class="{ 'input-erro': erros.telefone }"
        @input="limparErro('telefone')"
      />
      <span v-if="erros.telefone" class="msg-erro">{{ erros.telefone }}</span>
    </div>
        <button class="btn-salvar" @click="cadastrarCliente">
      CADASTRAR CLIENTE <i class="fas fa-user-check"></i>
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { store } from '../../store/index.js'

const emit = defineEmits(['cadastrado'])
const form = reactive({ nome: '', veiculo: '', telefone: '' })
const erros = reactive({ nome: '', veiculo: '', telefone: '' })

function validar() {
  let valido = true

  if (!form.nome.trim()) {
    erros.nome = 'Nome é obrigatório.'
    valido = false
  } else if (form.nome.trim().length < 2) {
    erros.nome = 'Nome deve ter ao menos 2 caracteres.'
    valido = false
  }

  if (!form.veiculo.trim()) {
    erros.veiculo = 'Veículo e placa são obrigatórios.'
    valido = false
  }

  if (!form.telefone.trim()) {
    erros.telefone = 'Telefone é obrigatório.'
    valido = false
  } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(form.telefone.trim())) {
    erros.telefone = 'Formato inválido. Ex: (42) 99999-9999'
    valido = false
  }

  return valido
}
function limparErro(campo) {
  erros[campo] = ''
}

function cadastrarCliente() {
  if (!validar()) return

  const novoCliente = { ...form }
  store.adicionarCliente(novoCliente)
  emit('cadastrado', novoCliente)

  form.nome     = ''
  form.veiculo  = ''
  form.telefone = ''
}
</script>

<style scoped>

.box-cadastro {
  background: #1c1e21;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  border-right: 4px solid #e63946;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.form-group { margin-bottom: 1.8rem; }

label {
  display: block;
  margin-bottom: 10px;
  color: #efefef;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

input {
  width: 100%;
  padding: 14px;
  background: #25282c;
  border: 1px solid #3e4247;
  border-radius: 12px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #e63946;
  background: #2c2f33;
  box-shadow: 0 0 15px rgba(230, 57, 70, 0.1);
}

.input-erro { border-color: #e63946 !important; }

.msg-erro {
  color: #e63946;
  font-size: 0.78rem;
  margin-top: 6px;
  display: block;
}


.btn-salvar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #e63946 0%, #c31520 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 400;
  font-family: 'Michroma', sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.4s ease;
  margin-top: 1rem;
}
</style>