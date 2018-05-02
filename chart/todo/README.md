# Todo

[Todo](https://github.com/bitnami-labs/redisdemo) is a simple todo application that uses ReactJS for the frontend and kubeless functions for the backend api.

## TL;DR

```console
$ helm install --name todo todo/ --set ingress.host=todos.192.168.99.100.nip.io
```

## Introduction

This charts deploys a [Todo](https://github.com/bitnami-labs/redisdemo) application on a [Kubernetes](http://kubernetes.io) cluster.

The Todo application frontend is implement in ReactJS and uses the [bitnami/node](https://github.com/bitnami/bitnami-docker-node) image for docker. The backend api functionality of the Todo application is implemented in NodeJS and the runtime is provided by the [Kubeless](https://kubeless.io/) serverless framework.

The application requires Redis for the data storage and the chart can be configured to deploy the [official Redis chart](https://hub.kubeapps.com/charts/stable/redis)(default) or use Azure Redis Cache using the Kubernetes Service Broker API.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure
- Ingress controller

## Installing the Chart

To install the chart with the release name `todo`:

```console
$ helm install --name todo todo/
```

The command deploys Todo on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `todo` deployment:

```console
$ helm delete --purge todo
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Todo chart and their default values.

|      Parameter      |                              Description                              |                     Default                     |
|---------------------|-----------------------------------------------------------------------|-------------------------------------------------|
| `image.registry`    | Node image registry                                                   | `docker.io`                                     |
| `image.repository`  | Node image repository                                                 | `bitnami/node`                                  |
| `image.tag`         | Node image tag                                                        | `8-prod`                                        |
| `image.pullPolicy`  | Node image pull policy                                                | `Always`                                        |
| `repository`        | Git repository of Todo application                                    | `https://github.com/bitnami-labs/redisdemo.git` |
| `revision`          | Git branch/revision of Todo application                               | `master`                                        |
| `ingress.host`      | Hostname for the Todo application                                     | `192.168.99.100.nip.io`                         |
| `redis.enabled`     | Whether to enable in-cluster redis, use Azure Redis Cache if disabled | `true`                                          |
| `azure.location`    | The Azure region in which to deploy Azure Redis Cache                 | `eastus`                                        |
| `azure.servicePlan` | The plan to request for Azure Redis Cache                             | `standard`                                      |
