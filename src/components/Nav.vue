<script setup lang="ts">

</script>

<template>
  <div class="m-2">
    <div class="flex items-center">
      <div class="flex items-center gap-x-2 cursor-pointer" onclick="router.push('/')">
<!--        <img-->
<!--          src="https://avatars.githubusercontent.com/u/50408224?v=4"-->
<!--          alt="Boilerbase Logo"-->
<!--        />-->
        <h1 class="text-3xl font-bold">BoilerBase</h1>
      </div>
      <div class="flex items-center gap-x-8">
        <router-link to="/">Home</router-link>
        <router-link to="/boilerplate">Boilerplates</router-link>
      </div>
      <div class="flex items-center gap-x-4">
<!--          TODO changer-->
<!--        <input-->
<!--          icon="i-heroicons-magnifying-glass-20-solid"-->
<!--          color="white"-->
<!--          :trailing="false"-->
<!--          placeholder="Search..."-->
<!--        />-->
<!--          TODO icon-->
<!--        <i name="i-heroicons-user" class="w-6 h-6" @click="onClickProfile"/>-->
      </div>
    </div>
  </div>
</template>

