#!/bin/bash

# Run flare-ai-consensus Docker container with environment variables
echo "Starting flare-ai-consensus container..."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found in current directory"
  exit 1
fi

# Load environment variables from .env file
echo "Loading environment variables from .env file..."
export $(grep -v '^#' .env | xargs)

# Show loaded variables (with sensitive data masked)
echo "Loaded variables:"
echo "OPENROUTER_API_KEY=****"
echo "GEMINI_API_KEY=****"
echo "TEE_IMAGE_REFERENCE=$TEE_IMAGE_REFERENCE"
echo "INSTANCE_NAME=$INSTANCE_NAME"

# Run with environment variables explicitly passed
echo "Running Docker container..."
docker run -p 80:80 -it \
  --env OPEN_ROUTER_API_KEY="$OPENROUTER_API_KEY" \
  --env GEMINI_API_KEY="$GEMINI_API_KEY" \
  --env TEE_IMAGE_REFERENCE="$TEE_IMAGE_REFERENCE" \
  --env INSTANCE_NAME="$INSTANCE_NAME" \
  flare-ai-consensus 