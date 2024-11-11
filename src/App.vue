<script setup lang="ts">
import Navbar from "@components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="px-2 pt-20 pb-4">
    <router-view></router-view>
  </div>
</template>

<style>
.router-link-exact-active {
  text-decoration: underline;
}
</style>
