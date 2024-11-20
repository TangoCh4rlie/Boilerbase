<script setup lang="ts">
import TrendingComponent from '@/components/home/TrendingComponent.vue'
import Testimonials from '@/components/home/Testimonials.vue'
import HeaderHomePage from '@/components/home/HeaderHomePage.vue'
</script>

<template>
  <main>
    <HeaderHomePage />
    <TrendingComponent id="trending"/>
    <Testimonials id="testimonials" />
  </main>
</template>
