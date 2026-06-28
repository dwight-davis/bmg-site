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
# RESEND_API_KEY mounted from Secret Manager (same secret bmg-crm-api uses).
# The contact-form + lead-magnet routes use this to email leads to
# dwight@cadrey.boisemarketingguy.com via Resend. Sender + destination
# defaults live in the route code; CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL
# env vars can override at deploy time if needed.
gcloud --project="$PROJECT" run deploy "$SERVICE" \
  --source=. \
  --region="$REGION" \
  --platform=managed \
  --allow-unauthenticated \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=1 \
  --max-instances=10 \
  --timeout=60 \
  --set-secrets="RESEND_API_KEY=resend-api-key:latest"

echo ""
echo "Service URL:"
gcloud --project="$PROJECT" run services describe "$SERVICE" \
  --region="$REGION" --format="value(status.url)"
