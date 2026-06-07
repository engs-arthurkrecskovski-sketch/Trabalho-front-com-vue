<template>
  <nav class="sidebar">
    <div class="logo-text-container">
      <i class="fas fa-tools logo-icon-red"></i>
      <h2>REAL<span>CARS</span></h2>
    </div>

    <ul>
      <li v-for="item in menuItems" :key="item.path">
        <RouterLink :to="item.path" :class="{ active: route.path === item.path }">
          <i :class="item.icon"></i> {{ item.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>


