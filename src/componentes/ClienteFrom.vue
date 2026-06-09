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
