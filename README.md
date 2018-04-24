# Deploy

```
# Start minikube
minikube start --extra-config=apiserver.Authorization.Mode=RBAC
minikube addons enable ingress
kubectl create clusterrolebinding kube-dns-admin --serviceaccount=kube-system:default --clusterrole=cluster-admin

# Install kubeless
kubectl create ns kubeless
kubectl create -f  https://github.com/kubeless/kubeless/releases/download/v0.6.0/kubeless-v0.6.0.yaml

# Install redis chart
helm init
[in charts/stable/redis] helm install . --values values-production.yaml

# Deploy functions
# manifest at manifests/functions.yaml
# need to know REDIS_HOST and REDIS_PASSWORD
kubeless function deploy \
  --runtime nodejs8 \
  --from-file backend/todos-create.js \
  --handler todos.create \
  --dependencies backend/package.json \
  --env REDIS_HOST=gangly-boxer-redis-master \
  --env REDIS_PASSWORD=$(kubectl get secret --namespace default gangly-boxer-redis -o jsonpath="{.data.redis-password}" | base64 --decode) \
  create
kubeless function deploy \
  --runtime nodejs8 \
  --from-file backend/todos-read-all.js \
  --handler todos.readAll \
  --dependencies backend/package.json \
  --env REDIS_HOST=gangly-boxer-redis-master \
  --env REDIS_PASSWORD=$(kubectl get secret --namespace default gangly-boxer-redis -o jsonpath="{.data.redis-password}" | base64 --decode) \
 read-all
kubeless function deploy \
  --runtime nodejs8 \
  --from-file backend/todos-read-one.js \
  --handler todos.readOne \
  --dependencies backend/package.json \
  --env REDIS_HOST=gangly-boxer-redis-master \
  --env REDIS_PASSWORD=$(kubectl get secret --namespace default gangly-boxer-redis -o jsonpath="{.data.redis-password}" | base64 --decode) \
  read-one
kubeless function deploy \
  --runtime nodejs8 \
  --from-file backend/todos-delete.js \
  --handler todos.delete \
  --dependencies backend/package.json \
  --env REDIS_HOST=gangly-boxer-redis-master \
  --env REDIS_PASSWORD=$(kubectl get secret --namespace default gangly-boxer-redis -o jsonpath="{.data.redis-password}" | base64 --decode) \
  delete
kubeless function deploy \
  --runtime nodejs8 \
  --from-file backend/todos-update.js \
  --handler todos.update \
  --dependencies backend/package.json \
  --env REDIS_HOST=gangly-boxer-redis-master \
  --env REDIS_PASSWORD=$(kubectl get secret --namespace default gangly-boxer-redis -o jsonpath="{.data.redis-password" | base64 --decode) \
  update

# Deploy Ingress
kubectl deploy -f manifests/ingress.yaml
```

# Run front end

Check frontend/react-redux/README.md. Needs to run on localhost.

