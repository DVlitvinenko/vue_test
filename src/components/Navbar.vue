<template>
  <nav
    class="fixed top-0 left-0 flex items-center justify-between w-screen p-2 py-4 mb-2 shadow-md bg-gray-50 shadow-gray-200"
  >
    <router-link to="/">ЛОГО</router-link>
    <div class="flex items-center justify-between space-x-2">
      <router-link to="/">Главная</router-link>
      <router-link to="/users">Пользователи</router-link>
      <router-link to="/posts">Посты</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
