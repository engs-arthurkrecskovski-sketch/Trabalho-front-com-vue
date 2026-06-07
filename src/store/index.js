import { reactive } from 'vue'

export const store = reactive({
  clientes: [],
  agendamentos: [],

    adicionarCliente(cliente) {
    this.clientes.push(cliente)
  },

  removerCliente(index) {
    this.clientes.splice(index, 1)
  },

  adicionarAgendamento(agendamento) {
    this.agendamentos.push(agendamento)
  },
})