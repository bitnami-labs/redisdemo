{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "todo.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "todo.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "todo.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{/*
Return the proper Node image name
*/}}
{{- define "todo.image" -}}
{{- $registryName :=  default "docker.io" .Values.image.registry -}}
{{- $tag := default "latest" .Values.image.tag -}}
{{- printf "%s/%s:%s" $registryName .Values.image.repository $tag -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "todo.redis.fullname" -}}
{{- printf "%s-%s" .Release.Name "redis" | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{/*
Return the redis readwrite hostname
*/}}
{{- define "todo.redis.host.readwrite" -}}
{{- printf "%s-%s-%s" .Release.Name "redis" "master" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Return the redis readonly hostname
*/}}
{{- define "todo.redis.host.readonly" -}}
{{- if and .Values.redis.cluster.enabled (gt (int .Values.redis.cluster.slaveCount) 0) -}}
{{- printf "%s-%s-%s" .Release.Name "redis" "slave" | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s-%s" .Release.Name "redis" "master" | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
