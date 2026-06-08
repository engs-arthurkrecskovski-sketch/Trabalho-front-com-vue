<template>
  <main>
    <div class="historico-content">
      <div class="header-page">
        <i class="fas fa-history header-icon"></i>
        <h1>Histórico de Serviços</h1>
        <p>Veja todos os serviços realizados e pendentes</p>
      </div>

      <div class="controles">
        <div class="busca-wrapper">
          <i class="fas fa-search"></i>
          <input
            v-model="busca"
            type="text"
            placeholder="Buscar por cliente, veículo ou serviço..."
          />
        </div>

        <select v-model="filtroStatus" class="filtro-select">
          <option value="">Todos os status</option>
          <option value="concluido">Concluídos</option>
          <option value="pendente">Pendentes</option>
        </select>
      </div>

       <div class="box-historico">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th @click="ordenarPor('cliente')" class="th-sort">
                  Cliente <i :class="iconeOrdem('cliente')"></i>
                </th>
                <th>Veículo</th>
                <th>Serviço</th>
                <th @click="ordenarPor('data')" class="th-sort">
                  Data <i :class="iconeOrdem('data')"></i>
                </th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
                 <tr v-for="(item, index) in historicoFiltrado" :key="index">
                <td>{{ item.cliente }}</td>
                <td>{{ item.veiculo }}</td>
                <td>{{ item.servico }}</td>
                <td>{{ item.data }}</td>
                <td>
                  <span v-if="item.status === 'concluido'" class="status concluido">CONCLUÍDO</span>
                  <span v-else class="status pendente">PENDENTE</span>
                </td>
                <td>
                  <button
                    v-if="item.status !== 'concluido'"
                    class="btn-concluir-hist"
                    @click="concluirServico(item)"
                    title="Marcar como concluído"
                  >
                    <i class="fas fa-check"></i> Concluir
                  </button>
                  <span v-else class="txt-ok">—</span>
                </td>
              </tr>

              <tr v-if="historicoFiltrado.length === 0">
                <td colspan="5" class="sem-resultado">Nenhum resultado encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="rodape-tabela">
          <span>{{ historicoFiltrado.length }} de {{ historico.length }} registros</span>
          <button v-if="busca || filtroStatus" class="btn-limpar" @click="limparFiltros">
            <i class="fas fa-times"></i> Limpar filtros
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../store/index.js'

const historico = computed(() => 
  store.agendamentos.map(ag => ({
    cliente: ag.cliente,
    veiculo: store.clientes.find(c => c.nome === ag.cliente)?.veiculo ?? '—',
    servico: ag.servico,
    data:    ag.data,
    status:  ag.status === 'Concluído' ? 'concluido' : 'pendente',
  }))
)

const busca         = ref('')
const filtroStatus  = ref('')
const colunaOrdem   = ref('')
const ordemAsc      = ref(true)

function ordenarPor(coluna) {
  if (colunaOrdem.value === coluna) {
    ordemAsc.value = !ordemAsc.value
  } else {
    colunaOrdem.value = coluna
    ordemAsc.value = true
  }
}

function iconeOrdem(coluna) {
  if (colunaOrdem.value !== coluna) return 'fas fa-sort text-muted'
  return ordemAsc.value ? 'fas fa-sort-up' : 'fas fa-sort-down'
}

const historicoFiltrado = computed(() => {
  let lista = [...historico.value]

  if (busca.value.trim()) {
    const termo = busca.value.toLowerCase()
    lista = lista.filter(item =>
      item.cliente.toLowerCase().includes(termo) ||
      item.veiculo.toLowerCase().includes(termo) ||
      item.servico.toLowerCase().includes(termo)
    )
  }

    if (filtroStatus.value) {
    lista = lista.filter(item => item.status === filtroStatus.value)
  }

  if (colunaOrdem.value) {
    lista.sort((a, b) => {
      const va = a[colunaOrdem.value].toLowerCase()
      const vb = b[colunaOrdem.value].toLowerCase()
      if (va < vb) return ordemAsc.value ? -1 : 1
      if (va > vb) return ordemAsc.value ?  1 : -1
      return 0
    })
  }

  return lista
})

function limparFiltros() {
  busca.value = ''
  filtroStatus.value = ''
}

function concluirServico(item) {
  const ag = store.agendamentos.find(
    a => a.cliente === item.cliente && a.servico === item.servico && a.data === item.data
  )
  if (ag) ag.status = 'Concluído'
}
</script>

<style scoped>

.historico-content {
  width: min(860px, 100%);
  animation: aparecerTela 0.6s ease;
}

.header-page { text-align: left; margin-bottom: 30px; }
.header-icon { font-size: 2.5rem; color: #e63946; margin-bottom: 10px; }
.header-page h1 {
  font-family: 'Exo 2', sans-serif;
  font-size: 2.2rem;
  color: white;
  margin-bottom: 5px;
  text-transform: uppercase;
}
.header-page p { font-family: 'Open Sans', sans-serif; color: #888; font-size: 1rem; }

.controles {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.busca-wrapper {
  flex: 1;
  min-width: 200px;
  position: relative;
  display: flex;
  align-items: center;
}

.busca-wrapper i {
  position: absolute;
  left: 14px;
  color: #888;
}

.busca-wrapper input {
  width: 100%;
  padding: 12px 14px 12px 40px;
  background-color: #1c1e21;
  border: 1px solid #3e4247;
  border-radius: 10px;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: 0.3s;
}

.busca-wrapper input:focus { border-color: #e63946; }

