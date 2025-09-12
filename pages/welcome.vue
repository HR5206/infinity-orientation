<!-- pages/welcome.vue -->
<template>
    <!-- Centered layout with a very light background -->
    <div
        class="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center"
    >
        <!-- Main content container -->
        <div class="bg-white p-10 rounded-xl shadow-md">
            <!-- The Welcome Emoji/Icon -->
            <div class="text-6xl mb-4">🎉</div>

            <!-- Welcome Heading -->
            <h1 class="text-4xl font-bold text-gray-900">Welcome!</h1>

            <!-- Subtitle Text -->
            <p class="mt-2 text-lg text-gray-600">
                You have successfully logged in.
            </p>

            <!-- Logout Link styled as a button -->
            <NuxtLink
                to="/login"
                class="mt-8 inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
            >
                Logout
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
// No script logic needed for this simple page, but the tag is here for good practice.
</script>

<!-- The <style> block is no longer needed! -->
