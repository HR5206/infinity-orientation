<template>
  <div class="flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
    <div 
      class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      :class="avatarColor"
    >
      <span class="text-white font-semibold text-sm">{{ getInitials(name) }}</span>
    </div>
    <span class="text-sm font-medium text-gray-700">{{ name }}</span>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  avatarColor: {
    type: String,
    required: true
  }
})

function getInitials(name) {
  const nameParts = name.split(' ')
  if (nameParts.length >= 2) {
    return nameParts[0][0] + nameParts[1][0]
  }
  return nameParts[0][0] || ''
}
</script>