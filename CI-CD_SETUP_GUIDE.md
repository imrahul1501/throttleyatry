# ThrotalYatry CI/CD with Docker - Complete Setup Guide

## 🎯 Overview

This guide sets up automated deployment for ThrotalYatry using:
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD Pipeline
- **SSH Deployment** - Automated server updates
- **Nginx** - Web server with performance optimization

When you push code to GitHub, the webhook automatically:
1. ✅ Builds a Docker image
2. ✅ Pushes to container registry
3. ✅ SSHs to your server
4. ✅ Pulls latest code
5. ✅ Rebuilds and restarts containers
6. ✅ Verifies deployment health

---

## 📋 Prerequisites

### Local Machine
- Git installed
- GitHub account
- Docker & Docker Compose (for local testing)

### Server (Linux - Ubuntu 20.04+ recommended)
- SSH access with sudo privileges
- 1GB+ RAM minimum
- 5GB+ disk space
- Internet connection

---

## 🚀 STEP 1: Prepare Your GitHub Repository

### 1.1 Push Code to GitHub

```bash
# Navigate to project directory
cd /path/to/Throttle-Yatry-main

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit with Docker CI/CD setup"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/Throttle-Yatry-main.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 1.2 Verify GitHub Repository Structure

Your repository should have these new files:
```
├── Dockerfile
├── docker-compose.yml
├── docker-entrypoint.sh
├── nginx.conf
├── .dockerignore
├── .github/
│   └── workflows/
│       └── deploy.yml
├── deploy.sh
├── server-setup.sh
└── ... (existing HTML files)
```

---

## 🖥️ STEP 2: Setup Your Server

### 2.1 SSH into Your Server

```bash
ssh root@your_server_ip
# or
ssh user@your_server_ip
```

### 2.2 Run Server Setup Script

```bash
# Download and run the setup script
cd /tmp
wget https://raw.githubusercontent.com/YOUR_USERNAME/Throttle-Yatry-main/main/server-setup.sh
chmod +x server-setup.sh
sudo ./server-setup.sh
```

**What this script does:**
- ✅ Updates system packages
- ✅ Installs Docker and Docker Compose
- ✅ Installs Git
- ✅ Creates `throtalyatry` user
- ✅ Sets up directories and permissions
- ✅ Clones your GitHub repository
- ✅ Creates deployment scripts
- ✅ Sets up systemd service

### 2.3 Generate SSH Keys for GitHub

```bash
# Switch to throtalyatry user
sudo su - throtalyatry

# Generate SSH key
ssh-keygen -t ed25519 -C "throtalyatry@$(hostname)" -f ~/.ssh/id_rsa -N ""

# Display public key
cat ~/.ssh/id_rsa.pub
```

### 2.4 Add SSH Key to GitHub

1. Go to GitHub repository → **Settings**
2. Click **Deploy Keys** (on the left)
3. Click **Add deploy key**
4. Paste the public key from Step 2.3
5. Enable **Allow write access** (if you want rollback capabilities)
6. Click **Add key**

---

## 🔐 STEP 3: Configure GitHub Actions Secrets

### 3.1 Add Required Secrets

1. Go to GitHub repository → **Settings**
2. Click **Secrets and variables** → **Actions**
3. Click **New repository secret**

**Add these secrets:**

| Name | Value | Example |
|------|-------|---------|
| `SERVER_HOST` | Your server IP or domain | `192.168.1.100` or `throtalyatry.com` |
| `SERVER_USER` | SSH user (from setup) | `throtalyatry` |
| `SERVER_SSH_KEY` | Private SSH key (full content) | Contents of `~/.ssh/id_rsa` |
| `SERVER_PORT` | SSH port (optional) | `22` |
| `SLACK_WEBHOOK` | Slack webhook URL (optional) | `https://hooks.slack.com/services/...` |

**To get the private SSH key:**

```bash
# On server as throtalyatry user
cat ~/.ssh/id_rsa

# Copy entire output including -----BEGIN and -----END lines
```

Paste the entire content into the `SERVER_SSH_KEY` secret.

### 3.2 Optional: Slack Notifications

1. Create a Slack App at https://api.slack.com/apps
2. Create an Incoming Webhook
3. Add the webhook URL as `SLACK_WEBHOOK` secret

---

## 🧪 STEP 4: Test Local Deployment

### 4.1 Build Docker Image Locally

```bash
# Navigate to project directory
cd /path/to/Throttle-Yatry-main

# Build the image
docker build -t throtalyatry:latest .
```

### 4.2 Run with Docker Compose

```bash
# Start containers
docker-compose up -d

# Check if running
docker-compose ps

# View logs
docker-compose logs -f

# Test the site
curl http://localhost

# Check health
curl http://localhost/health
```

### 4.3 Stop Containers

```bash
docker-compose down
```

---

## 🌐 STEP 5: Verify Deployment on Server

### 5.1 Test Manual Deployment

```bash
# SSH to server
ssh throtalyatry@your_server_ip

# Run deployment script
/usr/local/bin/throtalyatry-deploy deploy

# Monitor logs
tail -f /var/log/throtalyatry-deploy.log
```

### 5.2 Verify Website is Running

```bash
# Check container status
docker-compose ps

# Test website
curl http://localhost/health

# View recent logs
docker-compose logs --tail=50
```

---

## 📤 STEP 6: Make Your First Deployment

### 6.1 Push Code to GitHub

```bash
# Make a small change to test
echo "<!-- Deployment test -->" >> index.html

# Commit and push
git add .
git commit -m "Test deployment"
git push origin main
```

### 6.2 Monitor GitHub Actions

1. Go to GitHub repository → **Actions**
2. Click the latest workflow run
3. Watch the build and deploy jobs

You should see:
- ✅ `build-and-push` job building Docker image
- ✅ `deploy` job running deployment script
- ✅ Website updating automatically

---

## 🔄 Workflow Overview

```
┌─────────────────────────────────────────┐
│ 1. You push code to GitHub (main branch)│
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ 2. GitHub webhook triggers GitHub Action│
│    - Builds Docker image               │
│    - Pushes to registry                │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ 3. GitHub Action SSHs to your server    │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ 4. Server runs deploy.sh script:        │
│    - Pulls latest code                 │
│    - Stops old containers              │
│    - Builds new Docker image           │
│    - Starts new containers             │
│    - Verifies health                   │
│    - Sends Slack notification          │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│ 5. ✅ Website is updated automatically! │
└─────────────────────────────────────────┘
```

---

## 🆘 Troubleshooting

### Issue: GitHub Action fails with "Permission denied"

**Solution:**
```bash
# SSH key permissions must be exact
chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh

# Verify key format in GitHub secret - should include:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ...key content...
# -----END OPENSSH PRIVATE KEY-----
```

### Issue: Docker containers won't start

**Solution:**
```bash
# Check logs
docker-compose logs web

# Check disk space
df -h

# Check docker daemon
sudo systemctl status docker

# Restart docker
sudo systemctl restart docker
```

### Issue: Website shows "connection refused"

**Solution:**
```bash
# Check if nginx is listening
netstat -tlnp | grep :80

# Check if containers are running
docker ps

# View nginx error logs
docker-compose logs web
```

### Issue: "Permission denied" when running deploy.sh

**Solution:**
```bash
# Make script executable
chmod +x deploy.sh

# Run with proper user
sudo -u throtalyatry ./deploy.sh deploy
```

### Issue: Git pull fails in deployment

**Solution:**
```bash
# Check SSH key is authorized
ssh -i ~/.ssh/id_rsa git@github.com

# Verify repository URL
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/YOUR_USERNAME/Throttle-Yatry-main.git
```

---

## 🛠️ Common Commands

### View Logs

```bash
# GitHub Actions logs
# Go to: GitHub → Actions → select workflow run

# Server deployment logs
tail -f /var/log/throtalyatry-deploy.log

# Docker container logs
docker-compose logs -f web

# Nginx access logs
docker-compose exec web tail -f /var/log/nginx/access.log
```

### Manual Deployment

```bash
# SSH to server
ssh throtalyatry@your_server_ip

# Deploy latest code
/usr/local/bin/throtalyatry-deploy deploy

# Rollback to previous version
/usr/local/bin/throtalyatry-deploy rollback

# Check status
/usr/local/bin/throtalyatry-deploy status
```

### Docker Commands

```bash
# View running containers
docker-compose ps

# View all containers (including stopped)
docker-compose ps -a

# View container logs
docker-compose logs -f web

# Stop containers
docker-compose down

# Start containers
docker-compose up -d

# Rebuild and restart
docker-compose up -d --build

# Remove containers and images
docker-compose down -v --rmi all
```

---

## 🔒 Security Best Practices

### 1. SSH Key Security
- ✅ Use ED25519 keys (more secure than RSA)
- ✅ Never share private keys
- ✅ Store SSH keys securely in GitHub Secrets
- ✅ Rotate keys periodically

### 2. GitHub Actions
- ✅ Use GitHub Organization for production repos
- ✅ Protect main branch (require reviews before merge)
- ✅ Use environment secrets for sensitive data
- ✅ Review GitHub Actions logs for suspicious activity

### 3. Server Security
- ✅ Use SSH keys only (disable password auth)
- ✅ Configure firewall to allow only necessary ports
- ✅ Use non-root user for deployments
- ✅ Regularly update server and Docker

### 4. Container Security
- ✅ Use specific image versions (not `latest`)
- ✅ Scan images for vulnerabilities
- ✅ Don't run containers as root
- ✅ Use read-only filesystems where possible

---

## 📊 Monitoring & Maintenance

### Monitor Deployments

```bash
# Watch deployment logs in real-time
tail -f /var/log/throtalyatry-deploy.log

# Check container health
docker-compose ps

# Monitor resource usage
docker stats
```

### Regular Maintenance

```bash
# Clean up old Docker images
docker image prune -a

# Clean up unused containers
docker container prune

# Check disk usage
docker system df

# Backup application
tar -czf backup-$(date +%Y%m%d).tar.gz /home/throtalyatry/app
```

---

## 📈 Next Steps

### 1. Enable HTTPS (SSL/TLS)
- Uncomment SSL configuration in nginx.conf
- Add SSL certificates to `/etc/nginx/ssl/`
- Configure Let's Encrypt auto-renewal

### 2. Setup Monitoring
- Enable Prometheus metrics
- Setup ELK stack for logging
- Configure alerting

### 3. Performance Optimization
- Enable CDN (CloudFlare)
- Setup caching
- Optimize images

### 4. Database (if needed later)
- Add PostgreSQL/MySQL to docker-compose.yml
- Configure backup strategy
- Setup monitoring

---

## 🎓 Learning Resources

- Docker Documentation: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- GitHub Actions: https://docs.github.com/en/actions
- Nginx Documentation: http://nginx.org/en/docs/
- Deploy.sh script: Built-in help with `./deploy.sh help`

---

**Setup Complete!** 🎉

Your CI/CD pipeline is now ready. Every push to the main branch will automatically:
1. Build a new Docker image
2. Push to the registry
3. Deploy to your server
4. Update your live website

Happy deploying! 🚀
