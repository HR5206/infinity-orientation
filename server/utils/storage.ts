// Shared in-memory storage for demo purposes
// In production, you'd use a real database like PostgreSQL, MongoDB, etc.

export interface User {
  id: string
  username: string
  password: string
  createdAt: string
  lastLogin: string | null
}

// Use globalThis to share data across all server endpoints
if (!(globalThis as any).registeredUsers) {
  (globalThis as any).registeredUsers = []
}

export const getUsers = (): User[] => {
  return (globalThis as any).registeredUsers
}

export const addUser = (user: User): void => {
  (globalThis as any).registeredUsers.push(user)
}

export const findUserByUsername = (username: string): User | undefined => {
  const users = getUsers()
  return users.find(user => user.username.toLowerCase() === username.toLowerCase())
}

export const updateUser = (updatedUser: User): void => {
  const users = getUsers()
  const index = users.findIndex(user => user.id === updatedUser.id)
  if (index !== -1) {
    users[index] = updatedUser
  }
}

// Messaging storage and helpers
export interface Message {
  id: string
  senderId: string
  recipientId: string
  text: string
  createdAt: string
  readBy?: string[]
}

if (!(globalThis as any).messages) {
  (globalThis as any).messages = []
}

export const getAllMessages = (): Message[] => {
  return (globalThis as any).messages
}

export const addMessage = (message: Message): void => {
  // Ensure readBy exists for read-tracking
  const m = Object.assign({}, message, { readBy: message.hasOwnProperty('readBy') ? (message as any).readBy : [] })
  ;(globalThis as any).messages.push(m)
}

// Return messages between two users (both directions), sorted by createdAt ascending
export const getMessagesBetweenUsers = (userA: string, userB: string): Message[] => {
  const messages: Message[] = getAllMessages()
  return messages
    .filter(m => (m.senderId === userA && m.recipientId === userB) || (m.senderId === userB && m.recipientId === userA))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

// Mark messages as read for messages where recipientId === userId and the other participant is otherId
export const markMessagesAsRead = (userId: string, otherId: string) => {
  const messages: any[] = (globalThis as any).messages
  messages.forEach(m => {
    if (m.recipientId === userId && ((m.senderId === otherId && m.recipientId === userId) || (m.senderId === userId && m.recipientId === otherId))) {
      m.readBy = m.readBy || []
      if (!m.readBy.includes(userId)) m.readBy.push(userId)
    }
  })
}

// Return a list of conversation summaries for a given user (other user id + last message)
export const getConversationsForUser = (userId: string) => {
  const messages: Message[] = getAllMessages()
  const convMap: Record<string, Message> = {}

  messages.forEach(m => {
    const other = m.senderId === userId ? m.recipientId : (m.recipientId === userId ? m.senderId : null)
    if (!other) return

    // Keep the most recent message per other user
    if (!convMap[other] || new Date(m.createdAt) > new Date(convMap[other].createdAt)) {
      convMap[other] = m
    }
  })

  // Map to array with user info
  const users = getUsers()
  const result = Object.keys(convMap).map(otherId => {
    const user = users.find(u => u.id === otherId)
    // compute unread count for messages where recipient is the current user
    const unreadCount = getAllMessages().filter(m => m.senderId === otherId && m.recipientId === userId && (!m.readBy || !m.readBy.includes(userId))).length
    return {
      userId: otherId,
      username: user ? user.username : 'Unknown',
      lastMessage: convMap[otherId],
      unreadCount
    }
  })

  // Sort by most recent
  result.sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime())

  return result
}