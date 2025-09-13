<#
PowerShell smoke test for messaging API

Usage:
1. Start the dev server: npm run dev
2. Run this script in PowerShell: .\server\smoke_test.ps1

Before running, replace SENDER_ID and RECIPIENT_ID with real user ids returned by /api/users
#>

$base = 'http://localhost:3000'

Write-Host "Listing users..."
$users = Invoke-RestMethod -Uri "$base/api/users" -Method GET
Write-Host ($users | ConvertTo-Json -Depth 5)

if (-not $users.users -or $users.users.Count -lt 2) {
  Write-Warning "Need at least 2 registered users to run full smoke test. Create users via the UI first."
  exit 0
}

$sender = $users.users[0].id
$recipient = $users.users[1].id

Write-Host "Using sender: $($users.users[0].username) ($sender)"
Write-Host "Using recipient: $($users.users[1].username) ($recipient)"

Write-Host "Sending a test message..."
$body = @{ senderId = $sender; recipientId = $recipient; text = "Smoke test at $(Get-Date)" } | ConvertTo-Json
$resp = Invoke-RestMethod -Uri "$base/api/messages" -Method POST -Body $body -ContentType 'application/json'
Write-Host ($resp | ConvertTo-Json -Depth 5)

Write-Host "Fetching messages between the two users..."
$msgs = Invoke-RestMethod -Uri "$base/api/messages?userId=$sender&otherId=$recipient" -Method GET
Write-Host ($msgs | ConvertTo-Json -Depth 5)

Write-Host "Listing conversations for sender..."
$convs = Invoke-RestMethod -Uri "$base/api/conversations?userId=$sender" -Method GET
Write-Host ($convs | ConvertTo-Json -Depth 5)

Write-Host "Smoke test completed."
