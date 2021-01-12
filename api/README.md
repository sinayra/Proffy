# Build image
```
docker build --file ./node.dockerfile -t sinayra/proffy:latest .
```

# Create secrets from env file
```
kubectl create secret generic prod-secrets --from-env-file=./.env
```

# Run
```
kubectl apply -f .k8s
```

# Delete
```
kubectl delete -f .k8s
```