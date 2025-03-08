#!/bin/bash

# Run flare-ai-consensus Docker container with environment variables
echo "Starting flare-ai-consensus container..."
#add this line if you want to build the image
#docker build -t flare-ai-consensus .
docker run -p 80:80 -it --env-file .env flare-ai-consensus 