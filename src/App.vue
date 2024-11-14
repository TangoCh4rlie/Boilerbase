<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import SearchBar from '@/components/search/SearchBar.vue'
import { onBeforeUnmount, onMounted } from 'vue'
import { useSearchStore } from '@/stores/search.store'
import { storeToRefs } from 'pinia'
import router from '@/router'

const searchStore = useSearchStore()
const { displaySearchBar } = storeToRefs(searchStore)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.metaKey && event.key === 'k') {
    event.preventDefault()
    displaySearchBar.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Nav v-if="!/^\/github\/callback/.test(router.currentRoute.value.path)" />
    <RouterView />
    <SearchBar />
    <Footer />
  </div>
</template>
