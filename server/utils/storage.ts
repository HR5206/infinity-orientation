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