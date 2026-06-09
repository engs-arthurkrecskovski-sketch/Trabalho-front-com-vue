<template>
    <main>
    <div class="form-container">
        <div class="header-content">
            <i class="fas fa-user-plus header-icon"></i>
            <h1>Cadastrar Cliente</h1>
            <p>preencha os dados para iniciar um novo atendimento premium</p>
        </div>

        <ClienteForm @cadastrado="aoCadastrar" />
      <ClienteModal
        :modal-aberto="modalAberto"
        :ultimo-cadastro="ultimoCadastro"
        @fechar="fecharModal"
      />
    </div>
    </main>
</template>