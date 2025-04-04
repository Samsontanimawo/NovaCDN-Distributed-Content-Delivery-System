# Check Kubernetes version
kubectl version --short

# Get cluster information
kubectl cluster-info

# List all nodes in the cluster
kubectl get nodes

# List all pods in the current namespace
kubectl get pods

# List all pods in all namespaces
kubectl get pods --all-namespaces

# Describe a specific pod
kubectl describe pod <pod-name>

# Get logs from a specific pod
kubectl logs <pod-name>

# Execute a command in a running pod
kubectl exec -it <pod-name> -- <command>

# Create a deployment
kubectl create deployment <deployment-name> --image=<image-name>

# Scale a deployment
kubectl scale deployment <deployment-name> --replicas=<number>

# Update a deployment
kubectl set image deployment/<deployment-name> <container-name>=<new-image>

# Rollback a deployment to the previous version
kubectl rollout undo deployment/<deployment-name>

# Get the status of a deployment
kubectl rollout status deployment/<deployment-name>

# Delete a deployment
kubectl delete deployment <deployment-name>

# Create a service
kubectl expose deployment <deployment-name> --type=LoadBalancer --name=<service-name>

# List all services in the current namespace
kubectl get services

# Get detailed information about a service
kubectl describe service <service-name>

# Delete a service
kubectl delete service <service-name>

# Get all resources (pods, services, deployments, etc.) in the current namespace
kubectl get all

# Get nodes' detailed information
kubectl describe node <node-name>

# Apply a configuration from a file
kubectl apply -f <file.yaml>

# Delete resources defined in a file
kubectl delete -f <file.yaml>

# Get events in the current namespace
kubectl get events

# Access the Kubernetes dashboard
kubectl proxy

# Get the current context
kubectl config current-context

# Switch to a different context
kubectl config use-context <context-name>

# Get the namespaces
kubectl get namespaces

# Create a namespace
kubectl create namespace <namespace-name>

# Delete a namespace
kubectl delete namespace <namespace-name>

# Describe a specific namespace
kubectl describe namespace <namespace-name>

# Get the resource quotas in a namespace
kubectl get resourcequota --namespace=<namespace-name>

# Get the limits and requests for pods in a namespace
kubectl get pods --namespace=<namespace-name> -o=jsonpath='{.items[*].spec.containers[*].resources}'

# Get a specific resource's details
kubectl get <resource-type> <resource-name>

# Get all available resources
kubectl api-resources