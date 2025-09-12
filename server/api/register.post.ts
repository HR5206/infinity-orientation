import { addUser, findUserByUsername, type User } from '../utils/storage'

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

    if (username.length < 3) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username must be at least 3 characters long'
      })
    }

    if (password.length < 4) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 4 characters long'
      })
    }

    // Check if username already exists
    if (findUserByUsername(username)) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Username already exists'
      })
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(), // Simple ID generation
      username: username.trim(),
      password: password, // Plain text as requested
      createdAt: new Date().toISOString(),
      lastLogin: null
    }

    // Add user to array
    addUser(newUser)

    console.log(`New user registered: ${username}`)
    console.log(`Total users: ${(globalThis as any).registeredUsers.length}`)

    // Return success (without password)
    return {
      success: true,
      message: 'Account created successfully!',
      user: {
        id: newUser.id,
        username: newUser.username,
        createdAt: newUser.createdAt
      }
    }

  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Registration error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})