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

</template>


