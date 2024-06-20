#!/bin/bash

# Source the authTest.sh script to reuse authentication functions
source ./tests/authTest.sh

# Function to perform actions as a specific user
perform_actions_as_user() {
  local username=$1
  local token=$2
  
  echo "User $username checking partnership status..."
  curl -X GET http://localhost:3000/user/partnershipStatus -H "Authorization: Bearer $token"
  echo ""
  echo "------------------------------------------------"
  echo ""

  echo "User $username generating a code..."
  curl -X POST http://localhost:3000/user/generateCode -H "Authorization: Bearer $token"
  echo ""
  echo "------------------------------------------------"
  echo ""

  echo "User $username entering a code..."
  # Replace CODE_VALUE with an actual code value
  curl -X POST http://localhost:3000/user/enterCode -H "Authorization: Bearer $token" -d '{"code": "CODE_VALUE"}' -H "Content-Type: application/json"
  echo ""
  echo "------------------------------------------------"
  echo ""
}

# Perform actions as testuser1
perform_actions_as_user "testuser1" "$TOKEN1"

# Perform actions as testuser2
perform_actions_as_user "testuser2" "$TOKEN2"

# Perform actions as testuser3
perform_actions_as_user "testuser3" "$TOKEN3"

# Clean up - delete the test users
delete_user "testuser1"
delete_user "testuser2"
delete_user "testuser3"
delete_user "testuser4"
delete_user "testuser5"
delete_user "testuser6"
delete_user "testuser7"
delete_user "testuser8"
delete_user "testuser9"
delete_user "testuser10"

echo "Test completed."
