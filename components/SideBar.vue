<template>
    <div class="col-span-1 bg-gray-100 p-4 rounded-lg overflow-y-auto">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">Chats</h2>
        <div class="space-y-2">
            <div v-if="!props.currentUserId" class="text-sm text-gray-500">No current user set. Log in to see users.</div>
            <div v-else>
                <div v-for="u in displayUsers" :key="u.id" @click="$emit('select', u)" class="flex items-center justify-between p-2 rounded hover:bg-gray-200 cursor-pointer">
                    <div class="flex items-center space-x-3">
                        <ChatLink :name="u.username" :avatar-color="avatarColor(u.username)" />
                        <div class="ml-2">
                            <div v-if="u.unreadCount && u.unreadCount > 0" class="text-xs bg-red-500 text-white px-2 rounded-full">{{ u.unreadCount }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import ChatLink from './ChatLink.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
    currentUserId: {
        type: String,
        default: null
    }
})

const users = ref([])
const conversations = ref([])
let intervalId = null

async function fetchUsers() {
    if (!props.currentUserId) return
    try {
        const res = await $fetch('/api/users')
        if (res && res.users) users.value = res.users
    } catch (e) {
        console.error('Failed to fetch users in SideBar', e)
    }
}

async function fetchConversations() {
    if (!props.currentUserId) return
    try {
        const res = await $fetch('/api/conversations?userId=' + encodeURIComponent(props.currentUserId))
        if (res && res.conversations) conversations.value = res.conversations
    } catch (e) {
        console.error('Failed to fetch conversations in SideBar', e)
    }
}

onMounted(() => {
    fetchUsers()
    fetchConversations()
    // poll every 5 seconds
    intervalId = setInterval(() => {
        fetchUsers()
        fetchConversations()
    }, 5000)
})

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})

const displayUsers = computed(() => {
    const others = users.value.filter(u => props.currentUserId ? u.id !== props.currentUserId : true)
    // merge unread counts from conversations
    return others.map(u => {
        const conv = conversations.value.find(c => c.userId === u.id)
        return Object.assign({}, u, { unreadCount: conv ? conv.unreadCount : 0 })
    })
})

function avatarColor(name) {
    const colors = ['bg-red-400','bg-blue-400','bg-green-400','bg-purple-400','bg-pink-400','bg-indigo-400','bg-yellow-400','bg-teal-400']
    const hash = Array.from(name).reduce((s,c)=>s + c.charCodeAt(0),0)
    return colors[hash % colors.length]
}
</script>
