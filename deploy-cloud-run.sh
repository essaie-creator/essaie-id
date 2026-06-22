# Deploy to Google Cloud Run
# Prerequisites: gcloud CLI installed and authenticated

# 1. Build the Docker image
gcloud builds submit --tag gcr.io/$(gcloud config get-value project)/cove-brand-system

# 2. Deploy to Cloud Run
gcloud run deploy cove-brand-system \
  --image gcr.io/$(gcloud config get-value project)/cove-brand-system \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_api_key_here \
  --port 8080

# 3. Get the deployed URL
gcloud run services describe cove-brand-system --platform managed --region us-central1 --format 'value(status.url)'
