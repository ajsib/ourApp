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
  
  echo ""
  echo "------------------------------------------------"
  echo ""
  
  if [ -z "$TOKEN" ] || [ "$TOKEN" == "null" ]; then
    echo "Login failed or no token received for user $email"
    exit 1
  else
    echo "Login successful, token received for user $email: $TOKEN"
    export TOKEN
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
register_user "testuser1" "Test" "User1" "testpassword1"
login_user "testuser1" "testpassword1"
TOKEN1=$TOKEN

register_user "testuser2" "Test" "User2" "testpassword2"
login_user "testuser2" "testpassword2"
TOKEN2=$TOKEN

register_user "testuser3" "Test" "User3" "testpassword3"
login_user "testuser3" "testpassword3"
TOKEN3=$TOKEN

register_user "testuser4" "Test" "User4" "testpassword4"
login_user "testuser4" "testpassword4"
TOKEN4=$TOKEN

register_user "testuser5" "Test" "User5" "testpassword5"
login_user "testuser5" "testpassword5"
TOKEN5=$TOKEN

register_user "testuser6" "Test" "User6" "testpassword6"
login_user "testuser6" "testpassword6"
TOKEN6=$TOKEN

register_user "testuser7" "Test" "User7" "testpassword7"
login_user "testuser7" "testpassword7"
TOKEN7=$TOKEN

register_user "testuser8" "Test" "User8" "testpassword8"
login_user "testuser8" "testpassword8"
TOKEN8=$TOKEN

register_user "testuser9" "Test" "User9" "testpassword9"
login_user "testuser9" "testpassword9"
TOKEN9=$TOKEN

register_user "testuser10" "Test" "User10" "testpassword10"
login_user "testuser10" "testpassword10"
TOKEN10=$TOKEN
