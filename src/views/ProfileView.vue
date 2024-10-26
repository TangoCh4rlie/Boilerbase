<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

const { logout } = useAuthStore()
</script>

<template>
  <p>Profile</p>
  <button @click="logout">Logout</button>
</template>

<style scoped></style>
