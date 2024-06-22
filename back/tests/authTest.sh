#!/bin/bash

# Check if the profile picture file exists
PROFILE_PIC_PATH="$HOME/projects/ourApp/back/tests/test.jpg"
if [[ ! -f "$PROFILE_PIC_PATH" ]]; then
  echo "Error: Profile picture file '$PROFILE_PIC_PATH' not found."
  exit 1
fi

# Function to register a new user with a profile picture
register_user() {
  local email=$1
  local firstName=$2
  local lastName=$3
  local password=$4
  echo "Registering user $email..."
  curl -X POST http://localhost:3000/auth/register \
    -F "email=$email" \
    -F "firstName=$firstName" \
    -F "lastName=$lastName" \
    -F "password=$password" \
    -F "role=user" \
    -F "profilePicture=@$PROFILE_PIC_PATH"
  echo ""
  echo "------------------------------------------------"
  echo ""
}

# Function to log in with the newly registered user
login_user() {
  local email=$1
  local password=$2
  echo "Logging in with user $email..."
  LOGIN_RESPONSE=$(curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{
    "email": "'"$email"'",
    "password": "'"$password"'"
  }')
  
  echo $LOGIN_RESPONSE
  TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
  REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')
  
  echo ""
  echo "------------------------------------------------"
  echo ""
  
  if [ -z "$TOKEN" ] || [ "$TOKEN" == "null" ]; then
    echo "Login failed or no token received for user $email"
    exit 1
  else
    echo "Login successful, tokens received for user $email: $TOKEN, $REFRESH_TOKEN"
    export TOKEN
    export REFRESH_TOKEN
  fi
  
  echo ""
  echo "------------------------------------------------"
  echo ""
}

# Function to refresh the token
refresh_token() {
  echo "Refreshing token..."
  REFRESH_RESPONSE=$(curl -X POST http://localhost:3000/auth/refresh-token -H "Content-Type: application/json" -d '{
    "refreshToken": "'"$REFRESH_TOKEN"'"
  }')
  
  echo $REFRESH_RESPONSE
  NEW_TOKEN=$(echo $REFRESH_RESPONSE | jq -r '.token')
  NEW_REFRESH_TOKEN=$(echo $REFRESH_RESPONSE | jq -r '.refreshToken')
  
  echo ""
  echo "------------------------------------------------"
  echo ""
  
  if [ -z "$NEW_TOKEN" ] || [ "$NEW_TOKEN" == "null" ]; then
    echo "Token refresh failed"
    exit 1
  else
    echo "Token refresh successful, new tokens received: $NEW_TOKEN, $NEW_REFRESH_TOKEN"
    export TOKEN=$NEW_TOKEN
    export REFRESH_TOKEN=$NEW_REFRESH_TOKEN
  fi
  
  echo ""
  echo "------------------------------------------------"
  echo ""
}

# Function to clean up and delete the test user
delete_user() {
  local email=$1
  echo "Deleting user $email..."
  curl -X DELETE http://localhost:3000/auth/delete -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{
    "email": "'"$email"'"
  }'
  echo ""
  echo "------------------------------------------------"
  echo ""
}

# Main script execution
register_user "testuser1@example.com" "Test" "User1" "testpassword1"
login_user "testuser1@example.com" "testpassword1"
TOKEN1=$TOKEN
REFRESH_TOKEN1=$REFRESH_TOKEN

# Wait for a few seconds to simulate token expiration (optional)
sleep 5

# Refresh the token
refresh_token

register_user "testuser2@example.com" "Test" "User2" "testpassword2"
login_user "testuser2@example.com" "testpassword2"
TOKEN2=$TOKEN
REFRESH_TOKEN2=$REFRESH_TOKEN

# Wait for a few seconds to simulate token expiration (optional)
sleep 5

# Refresh the token
refresh_token
