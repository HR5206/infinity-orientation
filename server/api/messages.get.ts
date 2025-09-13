import { getMessagesBetweenUsers } from '../utils/storage'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  try {
    const query = getQuery(event)
    const userId = query.userId as string
    const otherId = query.otherId as string

    if (!userId || !otherId) {
      throw createError({ statusCode: 400, statusMessage: 'userId and otherId query params are required' })
    }

    const messages = getMessagesBetweenUsers(userId, otherId)

    // Mark messages as read for the requesting user
    try {
      // lazy import to avoid circular issues
      const { markMessagesAsRead } = await import('../utils/storage')
      markMessagesAsRead(userId, otherId)
    } catch (e) {
      // ignore
    }

    return { success: true, count: messages.length, messages }

  } catch (error: any) {
    if (error.statusCode) throw error
    console.error('Get messages error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
  }
})
