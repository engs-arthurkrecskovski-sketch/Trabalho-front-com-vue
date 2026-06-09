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