import { findUserByUsername, updateUser, type User } from '../utils/storage'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    const { username, password } = body

    // Validation
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username and password are required'
      })
    }

    // Find user
    const user = findUserByUsername(username)
    
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password'
      })
    }

    // Check password (plain text comparison as requested)
    if (user.password !== password) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password'
      })
    }

    // Update last login
    user.lastLogin = new Date().toISOString()
    updateUser(user)

    console.log(`User logged in: ${username}`)

    // Return success (without password)
    return {
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    }

  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})