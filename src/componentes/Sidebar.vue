<template>
  <nav class="sidebar">
    <div class="logo-text-container">
      <i class="fas fa-tools logo-icon-red"></i>
      <h2>REAL<span>CARS</span></h2>
    </div>

    <ul>
      <li v-for="item in menuItems" :key="item.path">
        <RouterLink :to="item.path" :class="{ active: route.path === item.path }">
          <i :class="item.icon"></i> {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>


<script setup>
import { useRoute, RouterLink } from 'vue-router'

const menuItems = [
  { path: '/',            icon: 'fas fa-chart-line',  label: 'Início' },
  { path: '/clientes',    icon: 'fas fa-users',        label: 'Clientes' },
  { path: '/agendamento', icon: 'fas fa-calendar-alt', label: 'Agendamento' },
  { path: '/historico',   icon: 'fas fa-history',      label: 'Histórico' },
  { path: '/interacao',   icon: 'fas fa-comments',     label: 'Interação' },
]

const route = useRoute()
</script>

<style scoped>
.sidebar {  
  width: 280px;
  height: 100vh;
  background-color: #111111;
  padding: 2rem 0;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border-right: 1px solid #1a1c1e;
  transition: all 0.3s ease;
}

