<template>
  <div class="header-page">
    <div class="header-left">
      <i class="fas fa-comments header-icon"></i>
      <div>
        <h1>Interação com Cliente</h1>
        <p>Envie mensagens, registre feedbacks e acompanhe o atendimento</p>
      </div>
    </div>
    <div class="status-badge">
      <i class="fas fa-circle"></i> Atendimento Ativo
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}