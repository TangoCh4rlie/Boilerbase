<script setup lang="ts">
import TrendingComponent from '@/components/home/TrendingComponent.vue'
import Testimonials from '@/components/home/Testimonials.vue'
import HeaderHomePage from '@/components/home/HeaderHomePage.vue'
</script>

<template>
  <main>
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-52 mt-72 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-45 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <HeaderHomePage />
    <TrendingComponent id="trending"/>
    <Testimonials id="testimonials" />
  </main>
</template>
