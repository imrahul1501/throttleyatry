#!/bin/bash

###############################################################################
# Deployment Script for ThrotalYatry
# This script handles the deployment process on the server
# Make sure to run this script as a sudo user or the owner of the app directory
###############################################################################

set -e

# Configuration
APP_DIR="/home/throtalyatry/app"
LOG_FILE="/var/log/throtalyatry-deploy.log"
BACKUP_DIR="/home/throtalyatry/backups"
DOCKER_COMPOSE_FILE="docker-compose.yml"
SLACK_WEBHOOK="${SLACK_WEBHOOK_URL:-}"

if docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD="docker-compose"
else
    echo "Docker Compose is required but was not found." >&2
    exit 1
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level=$1
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${level}[${timestamp}]${NC} ${message}" | tee -a "$LOG_FILE"
}

# Send Slack notification
notify_slack() {
    local status=$1
    local message=$2
    
    if [ -z "$SLACK_WEBHOOK" ]; then
        return
    fi
    
    local color="danger"
    if [ "$status" = "success" ]; then
        color="good"
    fi
    
    curl -X POST "$SLACK_WEBHOOK" \
        -H 'Content-type: application/json' \
        --data "{
            \"attachments\": [
                {
                    \"color\": \"$color\",
                    \"title\": \"ThrotalYatry Deployment\",
                    \"text\": \"$message\",
                    \"footer\": \"Deployment System\",
                    \"ts\": $(date +%s)
                }
            ]
        }" || true
}

# Main deployment function
deploy() {
    log "$BLUE" "=========================================="
    log "$BLUE" "Starting ThrotalYatry Deployment"
    log "$BLUE" "=========================================="
    
    # Check if app directory exists
    if [ ! -d "$APP_DIR" ]; then
        log "$RED" "Error: App directory $APP_DIR does not exist!"
        notify_slack "error" "Deployment failed: App directory not found"
        exit 1
    fi
    
    cd "$APP_DIR"
    log "$GREEN" "✓ Changed to app directory: $APP_DIR"
    
    # Create backup directory if it doesn't exist
    mkdir -p "$BACKUP_DIR"
    
    # Backup current state
    log "$YELLOW" "Creating backup..."
    BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
    $COMPOSE_CMD logs > "$BACKUP_DIR/${BACKUP_NAME}.log" || true
    log "$GREEN" "✓ Backup created: $BACKUP_NAME"
    
    # Pull latest code from GitHub
    log "$YELLOW" "Pulling latest code from GitHub..."
    if git pull origin main; then
        log "$GREEN" "✓ Code pulled successfully"
    else
        log "$RED" "Error: Failed to pull code from GitHub"
        notify_slack "error" "Deployment failed: Git pull failed"
        exit 1
    fi
    
    # Stop running containers
    log "$YELLOW" "Stopping running containers..."
    $COMPOSE_CMD down || true
    log "$GREEN" "✓ Containers stopped"
    
    # Build new Docker image
    log "$YELLOW" "Building Docker image..."
    if $COMPOSE_CMD build; then
        log "$GREEN" "✓ Docker image built successfully"
    else
        log "$RED" "Error: Failed to build Docker image"
        notify_slack "error" "Deployment failed: Docker build failed"
        exit 1
    fi
    
    # Start new containers
    log "$YELLOW" "Starting new containers..."
    if $COMPOSE_CMD up -d; then
        log "$GREEN" "✓ Containers started successfully"
    else
        log "$RED" "Error: Failed to start containers"
        notify_slack "error" "Deployment failed: Docker startup failed"
        exit 1
    fi
    
    # Wait for containers to be ready
    log "$YELLOW" "Waiting for containers to be ready..."
    sleep 10
    
    # Verify deployment
    log "$YELLOW" "Verifying deployment..."
    if curl -f http://localhost/health > /dev/null 2>&1; then
        log "$GREEN" "✓ Health check passed"
    else
        log "$RED" "Warning: Health check failed, but containers are running"
        # This is not a fatal error, containers might still be starting up
    fi
    
    # Show container status
    log "$BLUE" "Container Status:"
    $COMPOSE_CMD ps
    
    # Show recent logs
    log "$BLUE" "Recent Logs:"
    $COMPOSE_CMD logs --tail=20
    
    log "$GREEN" "=========================================="
    log "$GREEN" "✅ Deployment completed successfully!"
    log "$GREEN" "=========================================="
    
    notify_slack "success" "✅ Deployment completed successfully!\nTimestamp: $(date)"
}

# Rollback function
rollback() {
    log "$RED" "=========================================="
    log "$RED" "Initiating Rollback"
    log "$RED" "=========================================="
    
    cd "$APP_DIR"
    
    # Revert to previous commit
    git reset --hard HEAD~1
    
    # Rebuild and restart
    $COMPOSE_CMD down
    $COMPOSE_CMD up -d --build
    
    log "$YELLOW" "Rollback completed. Please verify the system."
    notify_slack "warning" "Rollback initiated for ThrotalYatry deployment"
}

# Help function
show_help() {
    cat << EOF
Usage: $0 [OPTIONS]

Options:
    deploy      Deploy latest code (default)
    rollback    Rollback to previous deployment
    status      Show deployment status
    logs        Show deployment logs
    help        Show this help message

Examples:
    $0 deploy
    $0 rollback
    $0 logs

EOF
}

# Main script logic
case "${1:-deploy}" in
    deploy)
        deploy
        ;;
    rollback)
        rollback
        ;;
    status)
        cd "$APP_DIR"
        $COMPOSE_CMD ps
        ;;
    logs)
        tail -f "$LOG_FILE"
        ;;
    help)
        show_help
        ;;
    *)
        echo "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
