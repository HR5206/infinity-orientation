Messaging API endpoints (demo)

Endpoints:

- POST `/api/messages` - body: `{ senderId, recipientId, text }`
- GET `/api/messages?userId=<>&otherId=<>` - returns messages between two users
- GET `/api/conversations?userId=<>` - returns conversation summaries for a user

Storage:

- In-memory (stored on `globalThis`) — data is lost when server restarts.

Quick test (PowerShell examples):

1. Start server: `npm run dev`
2. List users:
   `Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET`
3. Send message (replace IDs):
   `Invoke-RestMethod -Uri "http://localhost:3000/api/messages" -Method POST -Body (@{ senderId = 'SENDER_ID'; recipientId = 'RECIPIENT_ID'; text = 'Hello' } | ConvertTo-Json) -ContentType 'application/json'`
4. Get messages:
   `Invoke-RestMethod -Uri "http://localhost:3000/api/messages?userId=SENDER_ID&otherId=RECIPIENT_ID" -Method GET`

Client demo:

- Set localStorage `currentUserId` to a registered user id: `localStorage.setItem('currentUserId', 'USER_ID')`
