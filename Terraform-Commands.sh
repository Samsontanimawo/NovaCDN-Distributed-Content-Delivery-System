# Initialize a new or existing Terraform configuration
terraform init

# Validate the configuration files for syntax errors
terraform validate

# Format Terraform configuration files to a canonical format
terraform fmt

# Create an execution plan
terraform plan

# Apply the changes required to reach the desired state of the configuration
terraform apply

# Destroy the infrastructure managed by Terraform
terraform destroy

# Show the current state of the Terraform-managed infrastructure
terraform show

# Output the state of a resource or data source
terraform output

# Refresh the state file with the real infrastructure state
terraform refresh

# List all the resources in the Terraform state
terraform state list

# Remove a resource from the state file
terraform state rm <resource>

# Import existing infrastructure into Terraform
terraform import <resource> <id>

# Run a specific provisioner
terraform apply -target=<resource>

# View the version of Terraform
terraform version

# Upgrade Terraform to the latest version
terraform init -upgrade

# Enable or disable Terraform debug logging
TF_LOG=DEBUG terraform plan

# Create a new workspace
terraform workspace new <workspace-name>

# List all workspaces
terraform workspace list

# Select a workspace
terraform workspace select <workspace-name>

# Show the current workspace
terraform workspace show

# Delete a workspace
terraform workspace delete <workspace-name>

# Create a plan and save it to a file
terraform plan -out=<plan-file>

# Apply a saved plan file
terraform apply <plan-file>

# Get help for a specific command
terraform <command> -help