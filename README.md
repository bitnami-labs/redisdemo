# Create a minikube cluster

```
# Start minikube
minikube start --extra-config=apiserver.Authorization.Mode=RBAC
minikube addons enable ingress

kubectl create clusterrolebinding kube-dns-admin --serviceaccount=kube-system:default --clusterrole=cluster-admin

# Install kubeless
kubectl create ns kubeless
kubectl create -f  https://github.com/kubeless/kubeless/releases/download/v0.6.0/kubeless-v0.6.0.yaml
```

# Install the to chart

```
cd chart/todo/
helm dep update
helm install --name todo . --set ingress.host=192.168.99.100.nip.io
```

Access the application at http://192.168.99.100.nip.io
