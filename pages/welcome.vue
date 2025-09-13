<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
        <div class="bg-white p-10 rounded-xl shadow-md">
            <div class="text-6xl mb-4">🎉</div>
            <h1 class="text-4xl font-bold text-gray-900">Welcome!</h1>
            <p class="mt-2 text-lg text-gray-600">You have successfully logged in.</p>

            <div class="mt-8 flex justify-center space-x-3">
                <NuxtLink
                    to="/login"
                    class="inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors"
                >
                    Logout
                </NuxtLink>

                <button
                    id="open-instance"
                    class="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                >
                    Open separate instance
                </button>
            </div>
        </div>

        <button
            id="open-chat"
            title="Open chat"
            class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-500"
        >
            💬
        </button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const actingAs = ref(null)

function getParam(name) {
    try {
        const params = new URLSearchParams(window.location.search)
        return params.get(name)
    } catch (e) {
        return null
    }
}

onMounted(() => {
    const asUserId = getParam('asUserId')
    if (asUserId) {
        try {
            localStorage.setItem('currentUserId', asUserId)
            actingAs.value = asUserId
        } catch (e) {
            console.warn('Could not set localStorage in separate instance', e)
        }
    }

    const openInstanceBtn = document.getElementById('open-instance')
    if (openInstanceBtn) {
        openInstanceBtn.addEventListener('click', () => {
            try {
                const current = localStorage.getItem('currentUserId')
                const url = current ? `/welcome?asUserId=${encodeURIComponent(current)}` : '/welcome'
                window.open(url, '_blank', 'width=900,height=700')
            } catch (e) {
                window.open('/welcome', '_blank', 'width=900,height=700')
            }
        })
    }

    const openChatBtn = document.getElementById('open-chat')
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            window.open('/messaging', '_blank', 'width=900,height=700')
        })
    }
})
</script>
