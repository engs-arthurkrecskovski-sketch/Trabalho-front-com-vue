<template>
  <main>
    <div class="interacao-wrapper">

      <InteracaoHeader />

      <div class="interacao-grid">

        <ChatCliente
          :clientes="clientes"
          v-model:clienteSelecionado="clienteSelecionado"
          v-model:novaMensagem="novaMensagem"
          :mensagens="mensagensAtivas"
          @enviar="enviarMensagem"
          @trocar="trocarCliente"
        />

        <FeedbackCliente
          :clienteSelecionado="clienteSelecionado"
          :feedbacks="feedbacks"
          @salvar-feedback="salvarFeedback"
        />

      </div>
    </div>