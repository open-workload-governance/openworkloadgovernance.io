---
title: Shop API Example
description: Connect ownership, dependencies, access intents, and governance requirements.
weight: 30
---

The `shop-api` Workload describes a customer-facing webshop API in production with high criticality
and confidential data. Use the [complete Workload object](../specification/workload/) or download
[workload-shop-api.yaml](/examples/workload-shop-api.yaml).

## Identify Ownership

The owner names `omada:team` and `servicenow:group` map to the shop team and customer-platform group
in `references`. The approver names map to customer-owner and platform-owner roles. External systems
remain responsible for those teams, groups, and roles.

## Associate Identities And Resources

- The GitHub repository carries a token reference; Entra supplies a managed-identity reference.
- Resources include the production AWS account, GitHub repository, Kubernetes namespace, and
  `orders` Kafka topic.
- References also connect a ServiceNow business service and a Backstage component.

Token references are identifiers, not credentials included in this document.

## Declare Capabilities And Dependencies

The service provides customer read/write and order read/create scopes at its API endpoint. It
requires customer-read access from `customer-api`, payment-create access from `payment-api`, the
`orders` topic, and an AWS order-reader role.

## Describe Intended Actions

The GitHub OIDC source declares a deployment intent targeting the Kubernetes namespace and an
update-service intent targeting `customer-api`. These declarations do not themselves grant access.

## Record Governance Requirements

Change management is required through the customer-platform assignment group. Production deployments
and access changes require approvals; the governance block references the customer-owner role.
Backup ownership and recertification are required controls, with their enforcement details still
open. See [Ownership And Governance](../specification/ownership/) for the distinction between the
two approver lists.
