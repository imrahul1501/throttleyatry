#!/bin/bash

###############################################################################
# Server Setup Script for ThrotalYatry CI/CD Deployment
# This script sets up the server for CI/CD deployment
# Run this ONCE on your server before deploying
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}ThrotalYatry Server Setup for CI/CD${NC}"
echo -e "${BLUE}=========================================${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}This script must be run as root${NC}"
    exit 1
fi

# Configuration
APP_USER="throtalyatry"
APP_DIR="/home/throtalyatry/app"
GITHUB_REPO="https://github.com/YOUR_USERNAME/Throttle-Yatry-main.git"

echo -e "${YELLOW}Step 1: Update system packages${NC}"
apt-get update
apt-get upgrade -y

echo -e "${YELLOW}Step 2: Install Docker${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker already installed${NC}"
fi

echo -e "${YELLOW}Step 3: Install Docker Compose${NC}"
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi

echo -e "${YELLOW}Step 4: Install Git${NC}"
apt-get install -y git

echo -e "${YELLOW}Step 5: Create application user${NC}"
if ! id "$APP_USER" &>/dev/null; then
    useradd -m -s /bin/bash "$APP_USER"
    usermod -aG docker "$APP_USER"
    echo -e "${GREEN}✓ User $APP_USER created${NC}"
else
    echo -e "${GREEN}✓ User $APP_USER already exists${NC}"
    usermod -aG docker "$APP_USER" || true
fi

echo -e "${YELLOW}Step 6: Create application directory${NC}"
mkdir -p "$APP_DIR"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

echo -e "${YELLOW}Step 7: Create backup directory${NC}"
mkdir -p /home/throtalyatry/backups
chown -R "$APP_USER:$APP_USER" /home/throtalyatry/backups

echo -e "${YELLOW}Step 8: Setup logging${NC}"
mkdir -p /var/log
touch /var/log/throtalyatry-deploy.log
chown "$APP_USER:$APP_USER" /var/log/throtalyatry-deploy.log

echo -e "${YELLOW}Step 9: Clone repository${NC}"
if [ ! -d "$APP_DIR/.git" ]; then
    sudo -u "$APP_USER" git clone "$GITHUB_REPO" "$APP_DIR"
    echo -e "${GREEN}✓ Repository cloned${NC}"
else
    echo -e "${GREEN}✓ Repository already exists${NC}"
fi

echo -e "${YELLOW}Step 10: Setup deploy script${NC}"
cp "$APP_DIR/deploy.sh" /usr/local/bin/throtalyatry-deploy
chmod +x /usr/local/bin/throtalyatry-deploy
chown root:root /usr/local/bin/throtalyatry-deploy

echo -e "${YELLOW}Step 11: Create systemd service (optional)${NC}"
cat > /etc/systemd/system/throtalyatry.service << EOF
[Unit]
Description=ThrotalYatry Web Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
User=$APP_USER
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
echo -e "${GREEN}✓ Systemd service created${NC}"

echo -e "${YELLOW}Step 12: Setup SSH key for GitHub (if needed)${NC}"
SSH_KEY_PATH="/home/throtalyatry/.ssh/id_rsa"
if [ ! -f "$SSH_KEY_PATH" ]; then
    mkdir -p /home/throtalyatry/.ssh
    chmod 700 /home/throtalyatry/.ssh
    
    echo -e "${BLUE}Please generate an SSH key for GitHub:"
    echo -e "${BLUE}ssh-keygen -t ed25519 -C \"throtalyatry@$(hostname)\" -f $SSH_KEY_PATH -N \"\""
    echo -e "${BLUE}Then add the public key to your GitHub account's deploy keys${NC}"
else
    echo -e "${GREEN}✓ SSH key already exists${NC}"
fi

echo -e "${YELLOW}Step 13: Start services${NC}"
systemctl start throtalyatry
echo -e "${GREEN}✓ Services started${NC}"

echo -e "${YELLOW}Step 14: Verify installation${NC}"
docker --version
docker-compose --version
git --version

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ Server setup completed!${NC}"
echo -e "${GREEN}=========================================${NC}"

echo -e "${BLUE}Next steps:${NC}"
echo "1. Add SSH public key to GitHub Deploy Keys:"
echo "   cat /home/throtalyatry/.ssh/id_rsa.pub"
echo ""
echo "2. Configure GitHub Actions secrets:"
echo "   - SERVER_HOST: Your server IP/domain"
echo "   - SERVER_USER: $APP_USER"
echo "   - SERVER_SSH_KEY: Contents of /home/throtalyatry/.ssh/id_rsa"
echo "   - SERVER_PORT: 22 (or your SSH port)"
echo ""
echo "3. Test deployment:"
echo "   sudo -u $APP_USER $APP_DIR/deploy.sh deploy"
echo ""
echo "4. View logs:"
echo "   tail -f /var/log/throtalyatry-deploy.log"
