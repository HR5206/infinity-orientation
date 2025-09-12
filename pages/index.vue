<!-- pages/index.vue -->
<template>
    <!-- Main container with a light gray background to center the content -->
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
        <!-- The main card for the form -->
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <!-- Header section -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Create Account</h1>
                <p class="text-gray-500 mt-2">
                    Get started with your new account.
                </p>
            </div>

            <!-- Registration Form -->
            <form @submit.prevent="handleRegister" class="space-y-6">
                <!-- Name Input -->
                <div>
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Name</label
                    >
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

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
                        placeholder="Choose a secure password"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <!-- Submit Button -->
                <div>
                    <button
                        type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Register
                    </button>
                </div>
            </form>

            <!-- Footer Link to Login -->
            <p class="mt-6 text-center text-sm text-gray-600">
                Already have an account?
                <NuxtLink
                    to="/login"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Login here
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();

function handleRegister() {
    // Simulate a successful registration and redirect to the welcome page
    console.log("Simulating registration...");
    router.push("/welcome");
}
</script>

<!-- The <style> block is no longer needed! -->
