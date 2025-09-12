<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h1 class="text-2xl font-bold text-gray-900">
                        Registered Users
                    </h1>
                    <p class="text-gray-600">
                        Overview of all users who have registered on the site
                    </p>
                </div>

                <div class="p-6">
                    <!-- Loading state -->
                    <div v-if="isLoading" class="text-center py-8">
                        <div
                            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
                        ></div>
                        <p class="mt-2 text-gray-500">Loading users...</p>
                    </div>

                    <!-- Error state -->
                    <div v-else-if="error" class="text-center py-8">
                        <p class="text-red-600">{{ error }}</p>
                        <button
                            @click="fetchUsers"
                            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>

                    <!-- Users list -->
                    <div v-else>
                        <div class="mb-4 flex justify-between items-center">
                            <p class="text-sm text-gray-600">
                                Total users:
                                <span class="font-semibold">{{
                                    users.length
                                }}</span>
                            </p>
                            <button
                                @click="fetchUsers"
                                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                                Refresh
                            </button>
                        </div>

                        <!-- No users message -->
                        <div
                            v-if="users.length === 0"
                            class="text-center py-12"
                        >
                            <p class="text-gray-500">
                                No users have registered yet.
                            </p>
                            <a
                                href="/register"
                                class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Register First User
                            </a>
                        </div>

                        <!-- Users table -->
                        <div
                            v-else
                            class="overflow-hidden border border-gray-200 rounded-lg"
                        >
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ID
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Username
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Registered At
                                        </th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Last Login
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200"
                                >
                                    <tr
                                        v-for="user in users"
                                        :key="user.id"
                                        class="hover:bg-gray-50"
                                    >
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                        >
                                            {{ user.id }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            {{ user.username }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {{ formatDate(user.registeredAt) }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {{
                                                user.lastLogin === "Never"
                                                    ? "Never"
                                                    : formatDate(user.lastLogin)
                                            }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div class="flex justify-between items-center">
                        <a href="/" class="text-blue-600 hover:text-blue-500">
                            ← Back to App
                        </a>
                        <div class="text-xs text-gray-500">
                            Last updated: {{ new Date().toLocaleTimeString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Data
const users = ref([]);
const isLoading = ref(true);
const error = ref("");

// Fetch users from API
const fetchUsers = async () => {
    isLoading.value = true;
    error.value = "";

    try {
        const response = await $fetch("/api/users");
        users.value = response.users || [];
    } catch (err) {
        console.error("Failed to fetch users:", err);
        error.value = "Failed to load users. Please try again.";
    } finally {
        isLoading.value = false;
    }
};

// Format date for display
const formatDate = (dateString) => {
    if (!dateString || dateString === "Never") return "Never";
    return new Date(dateString).toLocaleString();
};

// Load users on page mount
onMounted(() => {
    fetchUsers();
});

// Set page meta
definePageMeta({
    layout: false,
});
</script>
