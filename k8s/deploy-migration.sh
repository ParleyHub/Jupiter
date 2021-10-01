#!/bin/bash

gcloud container clusters get-credentials parley-hub-cluster --zone asia-east2-c --project parley-hub-project

kubectl delete job $CI_NAME-migration --ignore-not-found=true

envsubst < config-migration.yaml > k8s-config.yaml

kubectl apply -f k8s-config.yaml
