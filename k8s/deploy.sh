#!/bin/bash

gcloud container clusters get-credentials parleyhub --region asia-east2 --project parleyhub-323409

envsubst < config.yaml > k8s-config.yaml

kubectl apply -f k8s-config.yaml
