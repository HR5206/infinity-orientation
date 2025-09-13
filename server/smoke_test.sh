#!/usr/bin/env bash
# Simple smoke test for messaging API
# Usage: Start dev server, then: bash server/smoke_test.sh

BASE="http://localhost:3000"

echo "Listing users..."
curl -s "$BASE/api/users" | jq

echo "Please ensure there are at least two users registered."

echo "Sending a test message requires replacing SENDER_ID and RECIPIENT_ID with real ids."
echo "Example send (replace IDs):"
echo "curl -X POST -H 'Content-Type: application/json' -d '{\"senderId\":\"SENDER_ID\",\"recipientId\":\"RECIPIENT_ID\",\"text\":\"Hello\"}' $BASE/api/messages"

echo "Done."
