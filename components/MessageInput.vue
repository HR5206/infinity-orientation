<template>
  <form @submit.prevent="onSubmit" class="p-4 border-t bg-white">
    <div class="flex items-center space-x-2">
      <input v-model="text" placeholder="Type a message..." class="flex-1 p-2 border rounded" />
      <button :disabled="!text.trim()" class="px-4 py-2 bg-blue-500 text-white rounded" type="submit">Send</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['send'])
const text = ref('')

function onSubmit() {
  const t = text.value.trim()
  if (!t) return
  emit('send', t)
  text.value = ''
}
</script>
