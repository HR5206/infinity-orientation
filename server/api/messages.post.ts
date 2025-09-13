import { addMessage, getUsers } from '../utils/storage'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  try {
    const body = await readBody(event)
    const { senderId, recipientId, text } = body

    if (!senderId || !recipientId || !text) {
      throw createError({ statusCode: 400, statusMessage: 'senderId, recipientId and text are required' })
    }

    // Basic validation: ensure users exist
    const users = getUsers()
    const senderExists = users.some(u => u.id === senderId)
    const recipientExists = users.some(u => u.id === recipientId)

    if (!senderExists || !recipientExists) {
      throw createError({ statusCode: 404, statusMessage: 'Sender or recipient not found' })
    }

    // Prevent sending messages to self
    if (senderId === recipientId) {
      throw createError({ statusCode: 400, statusMessage: 'Cannot send message to yourself' })
    }

    const newMessage = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
      senderId,
      recipientId,
      text,
      createdAt: new Date().toISOString()
    }

    // Save message and mark unread (readBy default handled in addMessage)
    addMessage(newMessage)

    // For this demo, we return the created message so the client can optimistically notify
    return { success: true, message: 'Message sent', data: newMessage }

  } catch (error: any) {
    if (error.statusCode) throw error
    console.error('Send message error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
  }
})
