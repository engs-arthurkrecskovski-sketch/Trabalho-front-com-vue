<template>
  <div v-if="store.clientes.length > 0" class="lista-clientes">
    <div class="lista-header">
      <h3><i class="fas fa-users"></i> Clientes Cadastrados ({{ store.clientes.length }})</h3>
      <input
        v-model="busca"
        type="text"
        placeholder="Buscar cliente..."
        class="input-busca"
      />
    </div>  

        <div
      v-for="(cliente, index) in clientesFiltrados"
      :key="index"
      class="cliente-item"
    >
      <div class="cliente-info">
        <strong>{{ cliente.nome }}</strong>
        <span>{{ cliente.veiculo }}</span>
        <span class="tel">{{ cliente.telefone }}</span>
      </div>
      <button class="btn-remover" @click="store.removerCliente(index)" title="Remover">
        <i class="fas fa-trash"></i>
      </button>
    </div>

</template>


