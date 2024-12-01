<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import SearchBar from '@/components/search/SearchBar.vue'
import router from '@/router'
</script>

<template>
  <div class="flex flex-col min-h-screen dark:bg-[#141723]">
    <Nav v-if="!/^\/github\/callback/.test(router.currentRoute.value.path)" />
    <RouterView />
    <SearchBar />
    <Footer />
  </div>
</template>
