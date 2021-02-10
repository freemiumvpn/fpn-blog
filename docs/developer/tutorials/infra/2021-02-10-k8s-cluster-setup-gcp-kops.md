---
slug: k8s-cluster-setup-gcp-kops
title: k8s cluster setup with gcp and kops
description: This tutorial will help you setup a K8s cluster in GCP
image: "https://miro.medium.com/max/3840/1*U-R58ahr5dtAvtSLGK2wXg.png"
author: Julian Tellez
author_title: Software Engineer
author_url: https://juliantellez.com/
author_image_url: https://avatars3.githubusercontent.com/u/4896851?s=460&u=dbdb682f65762bc117c0b6b330a6942798d80205&v=4
tags: ['gcp', 'k8s', 'kops', 'terraform']
---

This tutorial will help you setup a K8s cluster in GCP powered by [kops](https://kops.sigs.k8s.io/getting_started/gce/)


## Requisites

- [gcloud](https://cloud.google.com/sdk/gcloud)
- [kops](https://github.com/kubernetes/kops)
- [terraform](https://www.terraform.io/)

## The Goal

Following kops documentation we would like to be able to run the 
script below to outsource the deployment of our k8s cluster.
we would need:

- access to a project in gcp
- a bucket to store the state of the cluster

```bash
export KOPS_FEATURE_FLAGS=AlphaAllowGCE # to unlock the GCE features
export CLUSTER_NAME="test.k8s.local"
export ZONES=$(gcloud config get-value compute/zone)
export KOPS_STATE_STORE="gs://fpn-prod-kubernetes-kops-state/"
export PROJECT=$(gcloud config get-value project)

kops create cluster \
--name ${CLUSTER_NAME} \
--zones ${ZONES} \
--state ${KOPS_STATE_STORE} \
--project=$PROJECT \
--node-count=3 \
--cloud gce
```

## GCP setup

In order to access gcp you would need to login

```bash
gcloud auth application-default login
```

Alternatively you can create a service account and export the key
as a variable in the command line

```bash
gcloud iam service-accounts list
gcloud iam service-accounts keys create --iam-account <email-from-list> kops-gcp-key.json
export GOOGLE_CREDENTIALS=$(cat ./kops-gcp-key.json)
```

:::note
Changes to your infrastructure should be driven by code, so its OK to login manually, provided you come back and create a dedicated service account.

See the gcp project setup for a quick run through with Terraform
:::


## Kops State

Provision a bucket for kops state

```bash
resource "google_storage_bucket" "kops-state" {
  name          = "${var.namespace}-kops-state"
  location      = $var.location
  project       = google_project.k8s_project.project_id
  force_destroy = true

  uniform_bucket_level_access = true
}
```

## Create and Deploy

Now that we have setup access and a state, you may run the command from [the goal](#the-goal) section.

:::note
Finally configure your cluster with: kops update cluster --name test.k8s.local --yes
:::
