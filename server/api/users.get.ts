import { getUsers } from '../utils/storage'

// GET /api/users - Returns all registered users
export default defineEventHandler(async (event) => {
  // In a real app, you'd want authentication/authorization here
  // For demo purposes, we'll return all users
  
  // Get users from shared storage
  const users = getUsers()
  
  // Return users without passwords for security
  const safeUsers = users.map((user: any) => ({
    id: user.id,
    username: user.username,
    registeredAt: user.registeredAt,
    lastLogin: user.lastLogin || 'Never'
  }))
  
  return {
    success: true,
    count: safeUsers.length,
    users: safeUsers
  }
})