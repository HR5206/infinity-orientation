<template>
  <div class="flex-1 flex flex-col h-full">
    <div class="flex-1 overflow-auto p-4 space-y-3">
      <div v-for="msg in messages" :key="msg.id" :class="messageClass(msg)">
        <div class="text-sm text-gray-700">{{ msg.text }}</div>
        <div class="text-xs text-gray-400 mt-1">{{ formatDate(msg.createdAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  messages: { type: Array, required: true },
  currentUserId: { type: String, required: true }
})

function messageClass(msg) {
  return msg.senderId === __props.currentUserId
    ? 'self-end max-w-xs bg-blue-100 p-3 rounded-lg ml-auto'
    : 'self-start max-w-xs bg-gray-100 p-3 rounded-lg'
}

function formatDate(d) {
  return new Date(d).toLocaleString()
}
</script>
