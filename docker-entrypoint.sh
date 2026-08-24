#!/bin/sh
# Docker entrypoint script

# Substitute environment variables in HTML files if needed
# This allows dynamic configuration at runtime

set -e

# Log startup
echo "Starting ThrotalYatry website..."
echo "Environment: ${ENVIRONMENT:-production}"
echo "Port: ${PORT:-80}"

# Start nginx
exec "$@"
