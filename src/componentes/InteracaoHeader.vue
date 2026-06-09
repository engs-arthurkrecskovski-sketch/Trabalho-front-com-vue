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

.header-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.header-icon {
  font-size: 2.4rem;
  color: #e63946;
  filter: drop-shadow(0 0 12px rgba(230, 57, 70, 0.4));
}

.header-left h1 {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 2rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-left p { color: #888; font-size: 0.9rem; margin-top: 4px; }

.status-badge {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.status-badge i { font-size: 0.5rem; animation: piscar 1.5s infinite; }

@keyframes piscar {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.2; }
}

@media (max-width: 768px) {
  .header-left h1 { font-size: 1.5rem; }
}
</style>