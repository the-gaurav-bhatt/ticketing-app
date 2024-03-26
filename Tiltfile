# Define the Kubernetes manifests
k8s_yaml('./infra/k8s/auth-depl.yaml')

# Define the Docker build
docker_build('gauri65/auth', 'auth', dockerfile='auth/Dockerfile',
    live_update=[
        sync('./auth/src/**/*.ts', '/app')
    ]
)

# Define the file sync
