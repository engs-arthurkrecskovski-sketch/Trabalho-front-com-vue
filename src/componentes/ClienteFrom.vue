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
      <!-- v-if para mostrar mensagem de erro apenas quando necessário -->
      <span v-if="erros.nome" class="msg-erro">{{ erros.nome }}</span>
    </div>
