<script setup lang="ts">

import { useAuthStore } from '@/stores/auth.store'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute();
const authStore = useAuthStore();

if (route.query.code === undefined) {
   router.push('/');
}
await authStore.login(route.query.code as string)
//   .then(() => {
// //     router.push('/');
// // });
</script>

<template>
<p>Authentication in progress</p>
</template>
