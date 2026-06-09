import { createRouter, createWebHashHistory } from 'vue-router'

import Dashboard   from '../views/Dashboard.vue'
import Clientes    from '../views/Clientes.vue'
import Agendamento from '../views/Agendamento.vue'
import Historico   from '../views/Historico.vue'
import Interacao   from '../views/Interacao.vue'

const routes = [
  { path: '/',            component: Dashboard,   meta: { title: 'Painel Geral' } },
  { path: '/clientes',    component: Clientes,    meta: { title: 'Clientes' } },
  { path: '/agendamento', component: Agendamento, meta: { title: 'Agendamento' } },
  { path: '/historico',   component: Historico,   meta: { title: 'Histórico' } },
  { path: '/interacao',   component: Interacao,   meta: { title: 'Interação com Cliente' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | REALCARS`
})

export default router

import { reactive } from 'vue'

export const store = reactive({
  clientes: [],
  agendamentos: [],
  avaliacaoPendente: false,

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
