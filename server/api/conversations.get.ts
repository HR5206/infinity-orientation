import { getConversationsForUser } from '../utils/storage'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'GET') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  try {
    const query = getQuery(event)
    const userId = query.userId as string

    if (!userId) {
      throw createError({ statusCode: 400, statusMessage: 'userId query param is required' })
    }

    const conversations = getConversationsForUser(userId)

    return { success: true, count: conversations.length, conversations }

  } catch (error: any) {
    if (error.statusCode) throw error
    console.error('Get conversations error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
  }
})
