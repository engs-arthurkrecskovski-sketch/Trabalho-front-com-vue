<template>
  <Transition name="modal">
    <div v-if="visivel" class="overlay" @click.self="$emit('nao')">
      <div class="modal">
        <div class="modal-icon">
          <i class="fas fa-star"></i>
        </div>
        <h2>Agendamento realizado!</h2>
        <p>Deseja avaliar o nosso atendimento? Leva menos de 1 minuto.</p>
        <div class="modal-acoes">
          <button class="btn-sim" @click="$emit('sim')">
            <i class="fas fa-thumbs-up"></i> Avaliar agora
          </button>
          <button class="btn-nao" @click="$emit('nao')">
            Agora não
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visivel: Boolean,
})

defineEmits(['sim', 'nao'])
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.modal {
  background: #1c1e21;
  border: 1px solid #2c2f33;
  border-top: 4px solid #e63946;
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.15);
  border: 2px solid rgba(245, 158, 11, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: #f59e0b;
  margin: 0 auto 1.5rem;
}