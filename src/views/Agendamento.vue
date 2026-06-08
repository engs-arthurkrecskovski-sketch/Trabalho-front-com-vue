<template>
  <main>
    <div class="agendamento-content">
     
      <div class="header-page">
        <i class="fas fa-calendar-plus header-icon"></i>
        <h1>Novo Agendamento</h1>
        <p>Reserve o horário para o serviço</p>
      </div>

     
      <div class="box-agendar">

        <div class="form-group">
          <label><i class="fas fa-user"></i> Cliente Selecionado</label>
         
          <select v-model="form.cliente" :class="{ 'input-erro': erros.cliente }">
            <option value="" disabled>Selecione um cliente...</option>
            <!-- v-for renderiza dinamicamente a lista de clientes do store -->
            <option v-for="c in clientesDisponiveis" :key="c.nome" :value="c.nome">
              {{ c.nome }} ({{ c.veiculo }})
            </option>
          </select>
          <span v-if="erros.cliente" class="msg-erro">{{ erros.cliente }}</span>
         
          <span v-if="clientesDisponiveis.length === 0" class="msg-aviso">
            <i class="fas fa-info-circle"></i>
            Nenhum cliente cadastrado.
            <RouterLink to="/clientes">Cadastrar agora</RouterLink>
          </span>
        </div>

         <div class="form-group">
          <label><i class="fas fa-oil-can"></i> Tipo de Serviço</label>
          <select v-model="form.servico" :class="{ 'input-erro': erros.servico }">
            <option value="" disabled>Selecione o serviço...</option>
           
            <option v-for="s in tiposServico" :key="s" :value="s">{{ s }}</option>
          </select>
          <span v-if="erros.servico" class="msg-erro">{{ erros.servico }}</span>
        </div>

         <div class="form-row">
          <div class="form-group">
            <label><i class="fas fa-calendar-day"></i> Data</label>
            <input v-model="form.data" type="date" :min="dataMinima" :class="{ 'input-erro': erros.data }" />
            <span v-if="erros.data" class="msg-erro">{{ erros.data }}</span>
          </div>
          <div class="form-group">
            <label><i class="fas fa-clock"></i> Horário</label>
            <input v-model="form.hora" type="time" :class="{ 'input-erro': erros.hora }" />
            <span v-if="erros.hora" class="msg-erro">{{ erros.hora }}</span>
          </div>
        </div>

         <div class="form-group">
          <label><i class="fas fa-comment-dots"></i> Observações</label>
          <textarea
            v-model="form.observacoes"
            rows="3"
            placeholder="Detalhes adicionais sobre o veículo ou serviço..."
          ></textarea>
        </div>

         
        <button class="btn-confirmar" @click="confirmarAgendamento">
          FINALIZAR AGENDAMENTO <i class="fas fa-check"></i>
        </button>
      </div>

       
      <div v-if="store.agendamentos.length > 0" class="lista-agendamentos">
        <div class="lista-header">
          <h3><i class="fas fa-calendar-check"></i> Agendamentos Realizados</h3>

           <select v-model="filtroStatus" class="filtro-select">
            <option value="">Todos</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Pendente">Pendente</option>
          </select>
        </div>

         <div
          v-for="(ag, i) in agendamentosFiltrados"
          :key="i"
          class="ag-item"
        >

        <div class="ag-info">
            <strong>{{ ag.cliente }}</strong>
            <span>{{ ag.servico }} — {{ ag.data }} às {{ ag.hora }}</span>
            <span v-if="ag.observacoes" class="obs">💬 {{ ag.observacoes }}</span>
          </div>
          <div class="ag-acoes">
            <span class="badge" :class="ag.status === 'Concluído' ? 'badge-verde' : 'badge-amarelo'">
              {{ ag.status }}
            </span>
            <button
              v-if="ag.status === 'Pendente'"
              class="btn-concluir"
              @click="concluirAgendamento(store.agendamentos.indexOf(ag))"
              title="Marcar como concluído"
            >
              <i class="fas fa-check"></i>
            </button>
          </div>
        </div>


         <p v-if="agendamentosFiltrados.length === 0" class="sem-resultado">
          Nenhum agendamento encontrado.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { store } from '../store/index.js'


const tiposServico = [
  'Revisão Geral',
  'Troca de Óleo',
  'Sistema de Freios',
  'Suspensão',
  'Outros (Descrever abaixo)',
]


const clientesDisponiveis = computed(() => store.clientes)


const form = reactive({
  cliente: '',
  servico: '',
  data: '',
  hora: '',
  observacoes: '',
})


const erros = reactive({ cliente: '', servico: '', data: '', hora: '' })


const filtroStatus = ref('')


const dataMinima = new Date().toISOString().split('T')[0]


const agendamentosFiltrados = computed(() => {
  if (!filtroStatus.value) return store.agendamentos
  return store.agendamentos.filter(a => a.status === filtroStatus.value)
})


function validar() {
  let valido = true

  if (!form.cliente) { erros.cliente = 'Selecione um cliente.'; valido = false }
  else erros.cliente = ''

  if (!form.servico) { erros.servico = 'Selecione o tipo de serviço.'; valido = false }
  else erros.servico = ''

  if (!form.data) { erros.data = 'Informe a data.'; valido = false }
  else erros.data = ''

  if (!form.hora) { erros.hora = 'Informe o horário.'; valido = false }
  else erros.hora = ''

  return valido
}


function confirmarAgendamento() {
  if (!validar()) return

  store.adicionarAgendamento({
    cliente:     form.cliente,
    servico:     form.servico,
    data:        form.data,
    hora:        form.hora,
    observacoes: form.observacoes,
    status:      'Pendente',
  })

   form.cliente     = ''
  form.servico     = ''
  form.data        = ''
  form.hora        = ''
  form.observacoes = ''
}


function concluirAgendamento(index) {
  store.agendamentos[index].status = 'Concluído'
}
</script>

<style scoped>

.agendamento-content { width: min(520px, 100%); }

.header-page { text-align: center; margin-bottom: 2rem; }
.header-icon { color: #e63946; font-size: 2.5rem; margin-bottom: 10px; }
.header-page h1 {
  font-family: 'Chakra Petch', sans-serif;
  color: white;
  font-size: 2.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.header-page p { color: #888; font-size: 1rem; }

.box-agendar {
  background-color: #1c1e21;
  padding: 2.5rem;
  border-radius: 20px;
  border-top: 4px solid #e63946;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  animation: aparecerBox 1s ease;
}

.form-group { margin-bottom: 1.5rem; }

label {
  display: block;
  margin-bottom: 8px;
  color: #ddd;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
}

select, input, textarea {
  width: 100%;
  padding: 14px;
  background-color: #2c2f33;
  border: 1px solid #3e4247;
  border-radius: 10px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  outline: none;
  transition: 0.3s ease;
}

select option { background: #2c2f33; }

select:focus, input:focus, textarea:focus {
  border-color: #e63946;
  background-color: #32363b;
}

.input-erro { border-color: #e63946 !important; }

.form-row { display: flex; gap: 15px; }
.form-row .form-group { flex: 1; }

.msg-erro   { color: #e63946; font-size: 0.78rem; margin-top: 4px; display: block; }
.msg-aviso  { color: #f59e0b; font-size: 0.78rem; margin-top: 6px; display: block; }
.msg-aviso a { color: #e63946; text-decoration: underline; }

.btn-confirmar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 1.2rem;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.4s ease;
  margin-top: 10px;
}

.btn-confirmar:hover {
  background-color: #c31520;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(230, 57, 70, 0.3);
}


.lista-agendamentos {
  margin-top: 2rem;
  background: #1c1e21;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid #2c2f33;
  animation: aparecerBox 0.5s ease;
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

.filtro-select { width: auto; padding: 8px 12px; font-size: 0.85rem; }

.ag-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #25282c;
  border-radius: 12px;
  margin-bottom: 8px;
}

.ag-info { display: flex; flex-direction: column; gap: 2px; }
.ag-info strong { color: white; font-size: 0.9rem; }
.ag-info span   { color: #888; font-size: 0.8rem; }
.ag-info .obs   { color: #aaa; font-style: italic; }

.badge { padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; white-space: nowrap; }
.badge-verde   { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.badge-amarelo { background: rgba(245, 158, 11, 0.2);  color: #f59e0b; }

.sem-resultado { color: #888; text-align: center; font-size: 0.9rem; padding: 1rem; }

.ag-acoes { display: flex; align-items: center; gap: 8px; }

.btn-concluir {
  background: transparent;
  border: 1px solid #10b981;
  color: #10b981;
  padding: 6px 9px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.78rem;
  transition: 0.3s;
}