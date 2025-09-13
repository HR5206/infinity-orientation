<template>
    <div class="h-screen overflow-hidden grid grid-cols-5 gap-4 p-4">
  <SideBar :currentUserId="currentUserId" @select="selectUser" />
  <div class="col-span-4 bg-white p-6 rounded-lg shadow-lg flex">
    <div class="flex-1 flex flex-col pl-4">
      <div class="border-b pb-3 mb-3">
        <div class="text-lg font-semibold">Chat</div>
        <div class="text-sm text-gray-500">{{ selectedUser ? selectedUser.username : 'Select a user to chat' }}</div>
      </div>

      <div class="flex-1 min-h-0 flex flex-col bg-gray-50 rounded p-2">
        <MessageList :messages="messages" :currentUserId="currentUserId" />
      </div>

      <MessageInput v-if="selectedUser" @send="sendMessage" />
    </div>
  </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MessageList from '~/components/MessageList.vue'
import MessageInput from '~/components/MessageInput.vue'
import SideBar from '~/components/SideBar.vue'

const users = ref([])
const conversations = ref([])
const messages = ref([])
const selectedUser = ref(null)
const currentUserId = ref(null)

async function fetchUsers() {
  try {
    const res = await $fetch('/api/users')
    if (res && res.users) users.value = res.users
  } catch (e) {
    console.error('Failed to fetch users', e)
  }
}

let conversationsInterval = null
async function fetchConversations() {
  if (!currentUserId.value) return
  try {
    const res = await $fetch('/api/conversations?userId=' + encodeURIComponent(currentUserId.value))
    if (res && res.conversations) conversations.value = res.conversations
  } catch (e) {
    console.error('Failed to fetch conversations', e)
  }
}

async function openConversation(otherId) {
  if (!currentUserId.value) {
    alert('Set a current user id in localStorage as "currentUserId" for demo (use /login)')
    return
  }
  try {
    const res = await $fetch('/api/messages?userId=' + encodeURIComponent(currentUserId.value) + '&otherId=' + encodeURIComponent(otherId))
    messages.value = res.messages || []
    const u = users.value.find(x => x.id === otherId)
    selectedUser.value = u || { id: otherId, username: 'Unknown' }
    // start polling messages for the open conversation every 2s
    startMessagesPolling(otherId)
  } catch (e) {
    console.error('Failed to fetch messages', e)
  }
}

function selectUser(u) {
  openConversation(u.id)
}

async function sendMessage(text) {
  if (!currentUserId.value || !selectedUser.value) return
  // prevent sending to self
  if (currentUserId.value === selectedUser.value.id) {
    console.warn('Attempted to send message to self; aborting')
    return
  }
  try {
    await $fetch('/api/messages', {
      method: 'POST',
      body: { senderId: currentUserId.value, recipientId: selectedUser.value.id, text }
    })
    await openConversation(selectedUser.value.id)
    await fetchConversations()
  } catch (e) {
    console.error('Failed to send message', e)
  }
}

onMounted(async () => {
  // Access localStorage only on client
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      currentUserId.value = localStorage.getItem('currentUserId') || null
    }
  } catch (e) {
    console.warn('localStorage not available:', e)
    currentUserId.value = null
  }

  await fetchUsers()
  await fetchConversations()
  // start polling conversations every 5s
  conversationsInterval = setInterval(fetchConversations, 5000)
})

onUnmounted(() => {
  if (conversationsInterval) clearInterval(conversationsInterval)
  stopMessagesPolling()
})

// become() removed — sidebar now shows conversations and we don't switch users here

let messagesInterval = null
function startMessagesPolling(otherId) {
  stopMessagesPolling()
  if (!currentUserId.value) return
  messagesInterval = setInterval(async () => {
    try {
      const res = await $fetch('/api/messages?userId=' + encodeURIComponent(currentUserId.value) + '&otherId=' + encodeURIComponent(otherId))
      messages.value = res.messages || []
    } catch (e) {
      console.error('Failed to poll messages', e)
    }
  }, 2000)
}

function stopMessagesPolling() {
  if (messagesInterval) {
    clearInterval(messagesInterval)
    messagesInterval = null
  }
}

</script>

