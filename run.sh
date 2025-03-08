#!/bin/bash

# Run flare-ai-consensus Docker container with environment variables
echo "Starting flare-ai-consensus container..."
docker run -p 80:80 -it --env-file .env flare-ai-consensus 