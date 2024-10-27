<script setup lang="ts">
import markdownit from 'markdown-it'

const md = markdownit()
const result = md.render('# markdown-it rulezz!');
</script>

<template>
  <h1>Search</h1>
  <div v-html="result"></div>
  {{result}}
<p>search</p>
</template>

<style scoped>

</style>
