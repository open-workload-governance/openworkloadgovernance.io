---
title: Workload Object
description: The proposed generic Workload representation and its governance relationships.
weight: 10
aliases: [/docs/specification/context/]
---

**Version:** 0.1 Draft · **Status:** Proposal

## Complete Example

```yaml
apiVersion: openworkloadgovernance.io/v1alpha1
kind: Workload

metadata:
  type: service
  name: shop-api
  description: Customer-facing webshop API

ownership:
  owners:
    - omada:team
    - servicenow:group
  approvers:
    - omada:role:customer-owner
    - omada:role:platform-owner

classification:
  criticality: high
  environment: prod
  dataClassification: confidential

identities:
  - ref: github://repo/shop-api
    tokens:
      - ref: github://token/shop-api-token
  - ref: entra://managed-identity/shop-api

resources:
  - ref: aws://account/shop-prod
  - ref: github://repo/shop-api
  - ref: kubernetes://namespace/shop
  - ref: kafka://topic/orders

provides:
  apis:
    - name: shop-api
      scopes:
        - customer.read
        - customer.write
        - order.read
        - order.create
      endpoints:
        - https://api.shop.example.com

requires:
  - type: api
    service: customer-api
    scopes:
      - customer.read
  - type: api
    service: payment-api
    scopes:
      - payment.create
  - type: kafka-topic
    resource: orders
  - type: aws-role
    resource: arn:aws:iam::123456789012:role/order-reader

accessIntents:
  - action: deploy
    source:
      ref: github://oidc/shop-api-prod
    target:
      ref: kubernetes://namespace/shop
  - action: update-service
    source:
      ref: github://oidc/shop-api-prod
    target:
      ref: workload://customer-api

governance:
  changeManagement:
    required: true
    provider:
      ref: servicenow://assignment-group/customer-platform
  approvals:
    requiredFor:
      - production-deployment
      - access-change
    approvers:
      - ref: omada://role/customer-owner
  controls:
    backupOwnerRequired: true
    recertificationRequired: true

references:
  - ref: servicenow://business-service/BS12345
    name: servicenow:service
  - ref: backstage://component/shop-api
    name: backstage:component
  - ref: github://repo/shop-api
    name: github:repo
  - ref: omada://team/shop-team
    name: omada:team
  - ref: servicenow://group/customer-platform
    name: servicenow:group
  - ref: omada://role/customer-owner
    name: omada:role:customer-owner
  - ref: omada://role/platform-owner
    name: omada:role:platform-owner
```

The supplied identities fragment mixed a mapping (`github:repo`) with a sequence entry. This site
normalizes it into a list of `ref` objects: the repository carries nested token references, and the
managed identity is a separate entry. This interpretation needs review before a schema is published.

## Fields In The Draft

| Field                 | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `apiVersion`, `kind`  | Identify the proposed namespace and Workload object kind   |
| `metadata`            | Describe the workload type, name, and purpose              |
| `ownership.owners`    | Name references for accountable governance parties         |
| `ownership.approvers` | Name references for approval parties                       |
| `classification`      | Describe criticality, environment, and data classification |
| `identities`          | Associate identity and token references                    |
| `resources`           | Associate external resource references                     |
| `provides`            | Describe offered APIs, scopes, and endpoints               |
| `requires`            | Describe dependencies on APIs, scopes, topics, and roles   |
| `accessIntents`       | Describe intended actions from a source to a target        |
| `governance`          | Describe change management, approvals, and controls        |
| `references`          | Map local names to external objects                        |

## Capabilities And Dependencies

The example provides the `shop-api` API with customer and order scopes. It requires the
`customer.read` scope from `customer-api`, the `payment.create` scope from `payment-api`, the
`orders` Kafka topic, and an AWS role. Dependency names are not automatically grants or resolved
resource references; matching and scope semantics still need a contract.

## Access Intents

The example declares two actions for the GitHub OIDC source: `deploy` to a Kubernetes namespace and
`update-service` to `customer-api`. These are declared intentions, not proof of authorization or
instructions that this website executes.

## Draft Boundaries

Required fields, cardinality, accepted values, reference syntax, and enforcement semantics remain
open. This Workload example replaces the earlier Context model; it does not define membership,
delegates, or lifecycle fields. Values shown here are examples, not exhaustive enumerations.

See [Ownership And Governance](../ownership/) and [Reference Resolution](../resolution/). Download
[the example YAML](/examples/workload-shop-api.yaml).
