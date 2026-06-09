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
import DashboardHeader from '../components/dashboard/DashboardHeader.vue'
import DashboardCards from '../components/dashboard/DashboardCards.vue'
import DashboardGrid from '../components/dashboard/DashboardGrid.vue'
</script>

<style scoped>
.dashboard-wrapper {
  width: min(860px, 100%);
}
</style>
