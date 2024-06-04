<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped>
.wrapper {
  padding: 20px 50px;
  background: #fafafb;
}
</style>