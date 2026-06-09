<template>
  <div class="coluna-chat">

    <div class="selector-cliente">
      <label><i class="fas fa-user"></i> Cliente em Atendimento</label>
      <select :value="clienteSelecionado" @change="$emit('update:clienteSelecionado', $event.target.value === '' ? null : clientes.find(c => c.nome === $event.target.value))" >
        <option value="" disabled :selected="!clienteSelecionado">Selecione o cliente...</option>
        <option v-for="c in clientes" :key="c.nome" :value="c.nome">
          {{ c.nome }} — {{ c.veiculo }}
        </option>
      </select>
    </div>

    <div class="chat-box" ref="chatBox">
      <div v-if="!clienteSelecionado" class="chat-vazio">
        <i class="fas fa-comment-slash"></i>
        <p>Selecione um cliente para iniciar o atendimento</p>
      </div>