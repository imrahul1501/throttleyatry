# Jenkins CI/CD deployment

This project can deploy automatically when `main` receives a GitHub push.

## Architecture

`git push` -> GitHub webhook -> Jenkins -> Docker build/validation -> SSH -> Ubuntu VM `192.168.106.139` -> `deploy.sh` -> Docker Compose/Nginx

Jenkins may run on the Ubuntu VM itself or on another machine that can SSH to it.

## 1. Prepare the Ubuntu VM

Run these commands on Ubuntu as root or a sudo user:

```bash
sudo apt update
sudo apt install -y git openssh-server docker.io docker-compose-plugin
sudo systemctl enable --now ssh docker
```

Create the deployment account and directories. If `server-setup.sh` has already been used, keep the existing account:

```bash
sudo useradd --create-home --shell /bin/bash throtalyatry || true
sudo usermod -aG docker throtalyatry
sudo mkdir -p /home/throtalyatry/app /home/throtalyatry/backups
sudo chown -R throtalyatry:throtalyatry /home/throtalyatry
```

Clone the repository as `throtalyatry` and make the deployment script executable:

```bash
sudo -u throtalyatry git clone https://github.com/imrahul1501/throttleyatry.git /home/throtalyatry/app
sudo chmod +x /home/throtalyatry/app/deploy.sh
```

Test locally on the VM before using Jenkins:

```bash
cd /home/throtalyatry/app
docker compose up -d --build
curl -f http://localhost/health
```

Port 80 must be available. Visit `http://192.168.106.139/` from the Windows host after opening port 80 in the Ubuntu firewall if needed:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable
```

## 2. Install Jenkins

Install Jenkins on Ubuntu using the current official Jenkins package instructions. During setup install these plugins:

- Pipeline
- Git
- GitHub Integration
- SSH Agent
- Docker Pipeline (optional if Docker is used by Jenkins)

Add the Jenkins service account to Docker and restart Jenkins:

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

The Jenkins host must be able to reach the VM:

```bash
ssh throtalyatry@192.168.106.139
```

## 3. Add the SSH credential

Create an SSH key for the Jenkins service account, or use a dedicated deployment key. Add the public key to `/home/throtalyatry/.ssh/authorized_keys` on the Ubuntu VM.

In Jenkins, go to **Manage Jenkins -> Credentials -> System -> Global credentials** and create:

- Kind: **SSH Username with private key**
- ID: `throtalyatry-server-ssh`
- Username: `throtalyatry`
- Private key: the matching private key

Do not commit the private key or put it in this repository.

## 4. Create the Jenkins job

1. Create a **Multibranch Pipeline** job, or a Pipeline job connected to `https://github.com/imrahul1501/throttleyatry.git`.
2. Set the branch to `main`.
3. Select **Pipeline script from SCM** and the repository's `Jenkinsfile`.
4. Enable **GitHub hook trigger for GITScm polling** if using a Pipeline job.
5. Run one manual build first and confirm the VM has the updated site.

The pipeline validates Compose, builds a CI image, and deploys only from `main`.

## 5. Configure the GitHub webhook

In GitHub, open **Settings -> Webhooks -> Add webhook**:

- Payload URL: `https://YOUR-JENKINS-DOMAIN/github-webhook/`
- Content type: `application/json`
- Secret: create a strong secret and configure it in Jenkins/GitHub integration if required
- Events: **Just the push event**
- Active: enabled

GitHub cannot call `http://192.168.106.139:8080/github-webhook/` unless that private address is reachable from GitHub. For a VMware NAT network, use one of these:

- Put Jenkins behind a public HTTPS domain and reverse proxy port 443 to Jenkins.
- Use a VPN/tunnel with a stable authenticated public endpoint.
- Use Jenkins polling instead of a webhook as a fallback.

Never expose Jenkins unauthenticated directly to the internet. Restrict access, use HTTPS, and keep the Jenkins firewall rules narrow.

## 6. Verify automatic deployment

```bash
git add .
git commit -m "Configure Jenkins deployment"
git push origin main
```

Watch the Jenkins build, then verify:

```bash
curl -f http://192.168.106.139/health
curl http://192.168.106.139/
ssh throtalyatry@192.168.106.139 'docker compose -f /home/throtalyatry/app/docker-compose.yml ps'
```

Deployment logs are written to `/var/log/throtalyatry-deploy.log` when that file is writable by the deployment account.
