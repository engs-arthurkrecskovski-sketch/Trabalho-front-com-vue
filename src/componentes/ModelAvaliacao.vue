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