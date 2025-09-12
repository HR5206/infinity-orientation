<!-- pages/login.vue -->
<template>
    <!-- Main container with a light background -->
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
        <!-- The card for the form -->
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Login</h1>
                <p class="text-gray-500 mt-2">
                    Welcome back! Please login to your account.
                </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-6">
                <!-- Email Input -->
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Email</label
                    >
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <!-- Password Input -->
                <div>
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-700"
                        >Password</label
                    >
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <!-- Submit Button -->
                <div>
                    <button
                        type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Login
                    </button>
                </div>
            </form>

            <!-- Footer Link -->
            <p class="mt-6 text-center text-sm text-gray-600">
                Don't have an account?
                <NuxtLink
                    to="/"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Register here
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();

function handleLogin() {
    // Simulate a successful login and redirect to the welcome page
    console.log("Simulating login...");
    router.push("/welcome");
}
</script>

<!-- The <style> block is no longer needed! You can completely remove it. -->
