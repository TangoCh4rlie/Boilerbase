<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Nav />
    <RouterView />
    <Footer />
  </div>
</template>
