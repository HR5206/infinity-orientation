<template>
  <div class="h-screen overflow-hidden grid grid-cols-5 gap-4 p-4">
    <!-- Left Side - 1/5 width -->
    <div class="col-span-1 bg-gray-100 p-4 rounded-lg overflow-y-auto">
      <h2 class="text-lg font-semibold mb-4 text-gray-800">Chats</h2>
      <div class="space-y-3">
        <ChatLink name="Sarah Wilson" avatar-color="bg-red-400" />
        <ChatLink name="Mike Johnson" avatar-color="bg-blue-400" />
        <ChatLink name="Emma Davis" avatar-color="bg-green-400" />
        <ChatLink name="Alex Chen" avatar-color="bg-purple-400" />
        <ChatLink name="Lisa Rodriguez" avatar-color="bg-pink-400" />
        <ChatLink name="David Kim" avatar-color="bg-indigo-400" />
        <ChatLink name="Maya Patel" avatar-color="bg-yellow-400" />
        <ChatLink name="Tom Anderson" avatar-color="bg-teal-400" />
      </div>
    </div>
    <!-- Middle Section - 4/5 width -->
    <div class="col-span-4 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
      <NuxtRouteAnnouncer />
      <NuxtWelcome />
    </div>
  </div>
</template>

<script setup>
import ChatLink from '../components/ChatLink.vue'
</script>
