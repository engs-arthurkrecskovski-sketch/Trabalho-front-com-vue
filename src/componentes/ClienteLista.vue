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
    
    <p v-if="clientesFiltrados.length === 0" class="sem-resultado">
      Nenhum cliente encontrado.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../store/index.js'

const busca = ref('')

const clientesFiltrados = computed(() => {
  const termo = busca.value.toLowerCase()
  return store.clientes.filter(c =>
    c.nome.toLowerCase().includes(termo) ||
    c.veiculo.toLowerCase().includes(termo)
  )
})
</script>

<style scoped>

.lista-clientes {
  margin-top: 2rem;
  background: #1c1e21;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid #2c2f33;
  animation: fadeIn 0.5s ease;
}

.lista-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 10px;
}

.lista-header h3 { color: white; font-size: 1rem; display: flex; align-items: center; gap: 8px; }
.lista-header h3 i { color: #e63946; }

.input-busca {
  width: auto;
  flex: 1;
  max-width: 200px;
  padding: 8px 12px;
  background: #25282c;
  border: 1px solid #3e4247;
  border-radius: 12px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  outline: none;
  transition: all 0.3s ease;
}

.input-busca:focus {
  border-color: #e63946;
  background: #2c2f33;
  box-shadow: 0 0 15px rgba(230, 57, 70, 0.1);
}

.cliente-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #25282c;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: 0.2s;
}
.cliente-item:hover { background: #2c2f33; }
    
.cliente-info { display: flex; flex-direction: column; gap: 2px; }
.cliente-info strong { color: white; font-size: 0.9rem; }
.cliente-info span   { color: #888; font-size: 0.8rem; }
.cliente-info .tel   { color: #10b981; }

.btn-remover {
  background: transparent;
  border: 1px solid #3e4247;
  color: #888;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-remover:hover { background: rgba(230, 57, 70, 0.2); color: #e63946; border-color: #e63946; }

.sem-resultado { color: #888; text-align: center; font-size: 0.9rem; padding: 1rem; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .lista-header { flex-direction: column; align-items: flex-start; }
  .input-busca { max-width: 100%; width: 100%; }
}
</style>