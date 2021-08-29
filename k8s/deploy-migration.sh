#!/bin/bash

gcloud container clusters get-credentials parleyhub --region asia-east2 --project parleyhub-323409

kubectl delete job $CI_NAME-migration --ignore-not-found=true

envsubst < config-migration.yaml > k8s-config.yaml

kubectl apply -f k8s-config.yaml
