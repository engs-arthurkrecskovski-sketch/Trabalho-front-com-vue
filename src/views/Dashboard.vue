<template>
  <main>
    <div class="dashboard-wrapper">
      <DashboardHeader />

      <DashboardCards />

      <DashboardGrid />
    </div>
  </main>
</template>

<script setup>
import DashboardHeader from '../componentes/DashboardHeader.vue'
import DashboardCards  from '../componentes/DashboardCards.vue'
import DashboardGrid   from '../componentes/DashboardGrid.vue'
</script>

<style scoped>
.dashboard-wrapper {
  width: min(860px, 100%);
}
</style>
