<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import Alert from '@/components/Alert.vue'
</script>

<template>
  <Nav />
  <Alert />
  <RouterView />
</template>
