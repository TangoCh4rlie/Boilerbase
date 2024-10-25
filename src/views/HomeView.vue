<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
console.log(user.value)
</script>

<template>
  Home
  <div v-if="user">
    <h1>Hi {{ user.username }}!</h1>
    <button @click="authStore.logout">Logout</button>
  </div>
  <div v-else>
    <p>You're not logged in.</p>
    <p>
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>
