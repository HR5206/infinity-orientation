<!-- <template>
  <div class="h-screen overflow-hidden grid grid-cols-5 gap-4 p-4">
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
    <div class="col-span-4 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
      <NuxtRouteAnnouncer />
      <NuxtWelcome />
    </div>
  </div>
</template>

<script setup>
// import ChatLink from '../components/ChatLink.vue'
</script> -->

<!-- app.vue -->
<template>
    <!-- Main application wrapper using flexbox to structure header, main, and footer -->
    <div class="flex flex-col min-h-screen bg-gray-50 font-sans">
        <!-- ===== HEADER ===== -->
        <header class="bg-white shadow-sm">
            <div class="container mx-auto px-4 py-4">
                <h1 class="text-2xl font-bold text-indigo-600">
                    My Awesome App
                </h1>
            </div>
        </header>

        <!-- ===== MAIN CONTENT (Your Pages) ===== -->
        <!-- flex-grow allows this element to take up all available space -->
        <main class="flex-grow">
            <!-- NuxtPage is where your page components will be rendered -->

            <NuxtPage />
        </main>

        <!-- ===== FOOTER ===== -->
        <footer class="bg-gray-800 text-white text-center p-4">
            <div class="container mx-auto">
                &copy; 2024 My Awesome App. All rights reserved.
            </div>
        </footer>
    </div>
</template>

<style>
/* This global style is helpful to ensure everything works smoothly */
html,
body,
#__nuxt {
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
