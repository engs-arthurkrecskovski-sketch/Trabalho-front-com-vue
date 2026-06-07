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

.logo-text-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 1.5rem;
  margin-bottom: 3rem;
}

.logo-icon-red { color: #c31520; font-size: 1.6rem; }


.sidebar h2 {
  color: white;
  font-size: 1.4rem;
  margin: 0;
  font-family: 'Chakra Petch', sans-serif;
}
.sidebar h2 span { color: #c31520; }

.sidebar ul { list-style: none; padding: 0; }

.sidebar a {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #cbd5e1;
  text-decoration: none;
  padding: 1rem 1.5rem;
  border-left: 4px solid transparent;
  transition: 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
}

.sidebar a:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.sidebar a.active {
  background-color: #1a1c1e;
  color: #ffffff !important;
  border-left: 4px solid #c31520;
  font-weight: 600;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100% !important;
    height: auto;
    position: fixed;
    padding: 0.5rem 0;
    flex-direction: column;
    border-right: none;
    border-bottom: 1px solid #1a1c1e;
}
}


