# ThrotalYatry CI/CD - Quick Start Checklist

Complete this checklist to get your CI/CD pipeline running.

## ✅ LOCAL SETUP (Your Computer)

- [ ] 1. Clone repository locally
  ```bash
  git clone https://github.com/YOUR_USERNAME/Throttle-Yatry-main.git
  cd Throttle-Yatry-main
  ```

- [ ] 2. Test Docker locally
  ```bash
  docker-compose up -d
  curl http://localhost
  docker-compose down
  ```

- [ ] 3. Push to GitHub
  ```bash
  git add .
  git commit -m "Add CI/CD with Docker"
  git push origin main
  ```

---

## ✅ SERVER SETUP (Your Server)

- [ ] 1. SSH into server
  ```bash
  ssh root@your_server_ip
  ```

- [ ] 2. Run server setup
  ```bash
  cd /tmp
  curl -O https://raw.githubusercontent.com/YOUR_USERNAME/Throttle-Yatry-main/main/server-setup.sh
  chmod +x server-setup.sh
  sudo ./server-setup.sh
  ```

- [ ] 3. Generate SSH keys
  ```bash
  sudo su - throtalyatry
  ssh-keygen -t ed25519 -C "throtalyatry@$(hostname)" -f ~/.ssh/id_rsa -N ""
  cat ~/.ssh/id_rsa.pub
  ```

- [ ] 4. Copy SSH public key

---

## ✅ GITHUB CONFIGURATION

### SSH Deploy Key

- [ ] 1. Go to GitHub → Settings → Deploy Keys
- [ ] 2. Click "Add deploy key"
- [ ] 3. Paste SSH public key from server
- [ ] 4. Enable "Allow write access"
- [ ] 5. Click "Add key"

### GitHub Secrets

- [ ] 1. Go to GitHub → Settings → Secrets and variables → Actions
- [ ] 2. Add `SERVER_HOST`
  - Example: `192.168.1.100` or `your-domain.com`

- [ ] 3. Add `SERVER_USER`
  - Value: `throtalyatry`

- [ ] 4. Add `SERVER_SSH_KEY`
  - Paste entire content of `~/.ssh/id_rsa` from server

- [ ] 5. Add `SERVER_PORT` (optional)
  - Value: `22`

- [ ] 6. Add `SLACK_WEBHOOK` (optional)
  - For deployment notifications

---

## ✅ VERIFY SETUP

### Local Testing

- [ ] 1. Build Docker image
  ```bash
  docker build -t throtalyatry:latest .
  ```

- [ ] 2. Run with Docker Compose
  ```bash
  docker-compose up -d
  docker-compose ps
  curl http://localhost/health
  docker-compose down
  ```

### Server Testing

- [ ] 1. SSH to server and test manual deployment
  ```bash
  ssh throtalyatry@your_server_ip
  /usr/local/bin/throtalyatry-deploy deploy
  tail -f /var/log/throtalyatry-deploy.log
  ```

- [ ] 2. Verify website is running
  ```bash
  curl http://your_server_ip/health
  ```

---

## ✅ FIRST DEPLOYMENT

- [ ] 1. Make a change to your code
  ```bash
  echo "<!-- Test -->" >> index.html
  ```

- [ ] 2. Commit and push
  ```bash
  git add .
  git commit -m "Test deployment"
  git push origin main
  ```

- [ ] 3. Monitor GitHub Actions
  - Go to GitHub → Actions
  - Watch the workflow execute

- [ ] 4. Verify deployment
  - Visit your server in browser
  - Check that new content appears

---

## ✅ ONGOING MAINTENANCE

### Regular Tasks

- [ ] Monitor deployment logs
  ```bash
  tail -f /var/log/throtalyatry-deploy.log
  ```

- [ ] Check container status
  ```bash
  docker-compose ps
  ```

- [ ] Review GitHub Actions runs
  - Go to GitHub → Actions

### Weekly Tasks

- [ ] Clean up old Docker images
  ```bash
  docker image prune -a
  ```

- [ ] Check server disk space
  ```bash
  df -h
  ```

- [ ] Review deployment logs for errors

### Monthly Tasks

- [ ] Backup application
  ```bash
  tar -czf backup-$(date +%Y%m%d).tar.gz /home/throtalyatry/app
  ```

- [ ] Update server packages
  ```bash
  sudo apt update && sudo apt upgrade
  ```

- [ ] Review security settings

---

## 🆘 QUICK TROUBLESHOOTING

### Website not updating after push

1. Check GitHub Actions: GitHub → Actions
2. Review deploy job logs for errors
3. SSH to server: `tail -f /var/log/throtalyatry-deploy.log`
4. Check containers: `docker-compose ps`

### Docker build fails

1. Check available disk space: `df -h`
2. Clean up old images: `docker image prune -a`
3. Check Docker daemon: `sudo systemctl status docker`
4. Review GitHub Actions logs

### Can't SSH to server

1. Check SSH key permissions: `chmod 600 ~/.ssh/id_rsa`
2. Verify server IP/domain is correct
3. Check if SSH port is open: `ssh -vvv user@server`
4. Review server firewall rules

### Container health check fails

1. Check container logs: `docker-compose logs web`
2. Verify port 80 is accessible: `curl http://localhost/`
3. Check nginx config: `docker-compose exec web nginx -t`
4. Review Docker resource limits

---

## 📊 STATUS COMMANDS

### Check Everything

```bash
# On server
ssh throtalyatry@your_server_ip

# View containers
docker-compose ps

# View logs
docker-compose logs -f

# Check health
curl http://localhost/health

# Check resource usage
docker stats
```

### Full Status Report

```bash
echo "=== Container Status ==="
docker-compose ps

echo "=== Recent Logs ==="
docker-compose logs --tail=20

echo "=== Deployment History ==="
tail -20 /var/log/throtalyatry-deploy.log

echo "=== Disk Usage ==="
df -h

echo "=== Docker Resource Usage ==="
docker stats --no-stream
```

---

## 🚀 SUCCESS INDICATORS

Your CI/CD is working when:

✅ You can push code to GitHub
✅ GitHub Actions workflow triggers automatically
✅ Docker image builds successfully
✅ Deployment script runs on server
✅ Website updates on your server
✅ You see confirmation in logs
✅ Health check returns 200 OK

---

## 📞 GETTING HELP

### Documentation
- Full setup guide: `CI-CD_SETUP_GUIDE.md`
- Deployment script help: `./deploy.sh help`
- Docker Compose docs: https://docs.docker.com/compose/

### Common Issues
- Permission denied → Check SSH key permissions
- Connection refused → Check if containers are running
- Docker build fails → Check disk space
- Can't find server → Verify SERVER_HOST secret

### Logs to Check
1. GitHub Actions logs
2. `/var/log/throtalyatry-deploy.log` on server
3. `docker-compose logs` on server
4. Browser console for frontend issues

---

**Status: Ready for Deployment** ✅

When you're done with all checkboxes above, your CI/CD pipeline is fully operational!

Every push to main will automatically deploy to production. 🚀
