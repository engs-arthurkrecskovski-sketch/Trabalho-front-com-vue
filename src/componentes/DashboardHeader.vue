<template>
  <div class="header-dashboard">
    <div class="logo-top-right">
      <img src="/logo.png" alt="Logo RealCars" />
    </div>
    <h1>Painel Geral</h1>
    <p>Resumo operacional da oficina hoje</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header-dashboard {
  margin-bottom: 40px;
  position: relative;
}

.header-dashboard h1 {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 2.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.header-dashboard p { color: #888; font-weight: 300; }

.logo-top-right { position: absolute; top: 0; right: 0; }
.logo-top-right img { width: 140px; height: auto; }

@media (max-width: 768px) {
  .header-dashboard { text-align: center; }
  .header-dashboard h1 { font-size: 2rem; }
  .logo-top-right { position: relative; display: block; margin: 0 auto 20px auto; text-align: center; }
}
</style>