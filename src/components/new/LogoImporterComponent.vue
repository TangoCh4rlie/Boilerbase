<script setup lang="ts">
import { ref } from 'vue'
import { fetchWrapper } from '@/_helpers/fetch-wrapper'

const imageFile = ref<File | null>(null)

const onImageChange = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null

  if (file && file.type.startsWith('image/')) {
    imageFile.value = file
    await uploadImage(file)
  }
}

const uploadImage = async (file: File): Promise<void> => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetchWrapper.post('boilerplate/banner', formData, true)
    console.log('Upload successful:', response)
  } catch (error) {
    // TODO: faire mieux que ca
    console.error('Error uploading image:', error)
  }
}
</script>

<template>
  <div class="col-span-full">
    <label
      for="cover-photo"
      class="block text-sm/6 font-medium text-gray-900"
    >Banner</label
    >
    <div
      class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
    >
      <div class="text-center">
        <PhotoIcon
          class="mx-auto h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
        <div class="mt-4 flex text-sm/6 text-gray-600">
          <label
            for="file-upload"
            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
              @change="onImageChange"
              accept="image/*"
            />
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
