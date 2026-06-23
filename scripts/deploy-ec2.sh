#!/usr/bin/env bash
set -euo pipefail

echo "==> Frontend build & deploy"
cd ~/gift4u/frontend
npm install
npm run build
sudo cp -r dist/* /var/www/gift4u/

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

sleep 5
curl -sf http://localhost:8080/api/products > /dev/null
echo "==> Deploy complete"
