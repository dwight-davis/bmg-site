#!/bin/bash
# Deploy bmg-site to Cloud Run. Pattern matches the BMG-CRM deploy scripts:
# bmg-deploy SA via CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE so this is safe to
# run regardless of which gcloud account is currently active globally.
set -euo pipefail

PROJECT=bmg-crm-2026
SERVICE=bmg-site
REGION=us-central1

DEPLOY_KEY="${BMG_DEPLOY_KEY:-$HOME/.config/gcloud/bmg-deploy.json}"
if [[ -f "$DEPLOY_KEY" ]]; then
  export CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE="$DEPLOY_KEY"
  export GOOGLE_APPLICATION_CREDENTIALS="$DEPLOY_KEY"
fi

echo "Deploying ${SERVICE} to project ${PROJECT}..."
gcloud --project="$PROJECT" run deploy "$SERVICE" \
  --source=. \
  --region="$REGION" \
  --platform=managed \
  --allow-unauthenticated \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=1 \
  --max-instances=10 \
  --timeout=60

echo ""
echo "Service URL:"
gcloud --project="$PROJECT" run services describe "$SERVICE" \
  --region="$REGION" --format="value(status.url)"
