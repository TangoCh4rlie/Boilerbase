<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: string[]
}>();

const emit = defineEmits(['update:modelValue']);

const featureList = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
const featureQuery = ref('')

const addFeature = (): void => {
  if (featureQuery.value) {
    featureList.value?.push(featureQuery.value)
    featureQuery.value = ''
  }
}
</script>

<template>
  <div class="mb-5">
    <label for="features" class="block text-sm/6 font-medium text-gray-900">Features that describe your project</label>
    <div class="mt-2 mb-1">
      <input
        v-model="featureQuery"
        type="text"
        name="features"
        id="features"
        class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        placeholder="Type and press Enter"
        @keyup.enter="addFeature()"
      />
    </div>
    <ul class="flex gap-1">
      <li v-for="feat in featureList" :key="feat" class="text-sm/6 text-gray-600 cursor-pointer">
        <span @click="featureList = featureList.filter(l => l !== feat)" class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10">{{ feat }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
