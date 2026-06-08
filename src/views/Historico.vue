<template>
  <main>
    <div class="historico-content">
      <div class="header-page">
        <i class="fas fa-history header-icon"></i>
        <h1>Histórico de Serviços</h1>
        <p>Veja todos os serviços realizados e pendentes</p>
      </div>

      <div class="controles">
        <div class="busca-wrapper">
          <i class="fas fa-search"></i>
          <input
            v-model="busca"
            type="text"
            placeholder="Buscar por cliente, veículo ou serviço..."
          />
        </div>

        <select v-model="filtroStatus" class="filtro-select">
          <option value="">Todos os status</option>
          <option value="concluido">Concluídos</option>
          <option value="pendente">Pendentes</option>
        </select>
      </div>

       <div class="box-historico">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th @click="ordenarPor('cliente')" class="th-sort">
                  Cliente <i :class="iconeOrdem('cliente')"></i>
                </th>
                <th>Veículo</th>
                <th>Serviço</th>
                <th @click="ordenarPor('data')" class="th-sort">
                  Data <i :class="iconeOrdem('data')"></i>
                </th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>