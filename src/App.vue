<template>
  <Sidebar />
  <RouterView />

  
  <a href="https://wa.me/5542999809581" target="_blank">
    <img src="/whatsapp.jpg" class="whatsapp-float" alt="WhatsApp" />
  </a>
</template>

<script setup>
import Sidebar from './componentes/Sidebar.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
#app {
  display: flex;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.whatsapp-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  z-index: 9999;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  transition: transform 0.3s;
}
.whatsapp-float:hover { transform: scale(1.1); }
</style>