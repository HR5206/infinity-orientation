<template>
    <div class="h-screen flex items-center justify-center bg-gray-50">
        <div class="max-w-md w-full space-y-8 p-8">
            <div>
                <h2
                    class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                >
                    Create your account
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Join the conversation
                </p>
            </div>

            <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
                <div class="space-y-4">
                    <div>
                        <label
                            for="username"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            v-model="form.username"
                            name="username"
                            type="text"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            v-model="form.password"
                            name="password"
                            type="password"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        :disabled="
                            !form.username || !form.password || isLoading
                        "
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span v-if="isLoading">Creating account...</span>
                        <span v-else>Create Account</span>
                    </button>
                </div>

                <div v-if="message" class="text-center">
                    <p
                        :class="
                            messageType === 'success'
                                ? 'text-green-600'
                                : 'text-red-600'
                        "
                        class="text-sm"
                    >
                        {{ message }}
                    </p>
                </div>

                <div class="text-center">
                    <p class="text-sm text-gray-600">
                        Already have an account?
                        <a
                            href="/login"
                            class="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign in here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
// Form data
const form = ref({
    username: "",
    password: "",
});

// UI state
const isLoading = ref(false);
const message = ref("");
const messageType = ref(""); // 'success' or 'error'

// Handle form submission
const handleSubmit = async () => {
    isLoading.value = true;
    message.value = "";

    try {
        // Call the registration API
        const response = await $fetch("/api/register", {
            method: "POST",
            body: {
                username: form.value.username,
                password: form.value.password,
            },
        });

        message.value = response.message || "Account created successfully!";
        messageType.value = "success";

        console.log("Registration successful:", response.user);

        // Save current user id in localStorage (client-only)
        try {
            if (typeof window !== 'undefined' && window.localStorage && response.user && response.user.id) {
                localStorage.setItem('currentUserId', response.user.id)
            }
        } catch (e) {
            console.warn('Could not access localStorage', e)
        }

        // Clear form after successful registration and redirect to messaging
        setTimeout(() => {
            form.value.username = "";
            form.value.password = "";
            message.value = "";
            navigateTo("/messaging");
        }, 800);
    } catch (error) {
        console.error("Registration failed:", error);
        message.value =
            error.data?.message || "Registration failed. Please try again.";
        messageType.value = "error";
    } finally {
        isLoading.value = false;
    }
};

// Set page meta
definePageMeta({
    layout: false, // Use no layout for auth pages
});
</script>
