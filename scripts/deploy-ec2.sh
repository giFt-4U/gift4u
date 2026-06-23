#!/usr/bin/env bash
set -euo pipefail

echo "==> Frontend build & deploy"
cd ~/gift4u/frontend
npm install
npm run build
sudo cp -r dist/* /var/www/gift4u/

echo "==> Oracle (if stopped)"
if command -v docker >/dev/null 2>&1; then
  sudo docker start oracle-xe 2>/dev/null || true
  sleep 15
fi

echo "==> Backend build & restart"
cd ~/gift4u/backend/gift-4u
chmod +x ./mvnw
./mvnw package -DskipTests

JAR_PID=$(pgrep -f 'gift-4u-.*\.jar' || true)
if [ -n "$JAR_PID" ]; then
  kill "$JAR_PID"
  sleep 2
fi

nohup java -jar -Dspring.profiles.active=local target/gift-4u-0.0.1-SNAPSHOT.jar > ~/app.log 2>&1 &

echo "==> Waiting for backend (up to 60s)..."
for i in $(seq 1 20); do
  if curl -sf http://localhost:8080/api/products > /dev/null; then
    echo "==> Deploy complete"
    exit 0
  fi
  sleep 3
done

echo "==> Backend health check failed. Last lines of ~/app.log:"
tail -n 30 ~/app.log || true
exit 1
