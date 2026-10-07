---
title: Open Workload Governance
description: Vendor-neutral ownership and accountability across the workload lifecycle.
type: docs
---

**Workload Specification:** 0.1 Draft · **Status:** Proposal

Open Workload Governance (OWG) proposes a common way to describe workloads and their governance. A
generic Workload object connects ownership, identities, resources, capabilities, dependencies, and
access intents without prescribing an identity provider.

## Start Here

| Topic                                         | What you will find                              |
| --------------------------------------------- | ----------------------------------------------- |
| [Documentation](docs/)                        | Workloads, references, and a worked example     |
| [Workload Specification](docs/specification/) | The proposed object and governance requirements |
| [Shop API Example](docs/examples/)            | A service with dependencies and access intents  |
| [Project Roadmap](project/)                   | Scope, open decisions, and next steps           |

## Why we want Open Workload Governance

As cloud workloads, service accounts, microservices, and AI agents continue to proliferate, identity
and access are increasingly defined in code and changed through automated CI/CD pipelines.

Processes for requesting access for these workloads are often unknown. For example an AI agent that
wants to read the customer database. We need this information for submitting and automating access
requests, and linking to where those decisions are recorded.

## What is Open Workload Governance

Open Workload Governance defines a set of open protocols that enable interoperability between
workloads, governance platforms, identity systems, provisioning systems, and ticketing platforms.

The objective is to create an ecosystem in which organizations can implement their governance
processes using different products and platforms while maintaining a common governance model and
interface.

Rather than prescribing a specific workflow or technology stack, OWG standardizes how governance
information is exchanged, validated, and acted upon throughout the workload lifecycle.

> We are missing structured metadata about workload identities and how they (can) access other
> workloads.

To give a simple example snippet for the idea:

```yaml
apiVersion: openworkloadgovernance.io/v1alpha1
kind: Workload

metadata:
  type: api
  name: application:order-api
  description: Order backend API

ownership:
  owners:
    - ref: github:order-team

identities:
  - ref: kafka
    requires:
      - name: order-events
        ref: kafka:order-events
      - name: customer-events
        ref: kafka:topic/customer-events/read
  - ref: keycloak
    provides:
      - name: submit-order
        ref: keycloak:submit-order
    requires:
      - name: payment-check
        ref: keycloak:payment-check

references:
  - ref: keycloak://prod/identity/order-api
    name: keycloak
  - ref: keycloak://prod/application/order-api/scope/payment-check
    name: keycloak:submit-order
  - ref: keycloak://prod/application/payment-api/scope/payment-check
    name: keycloak:payment-check
  - ref: kafka://prod/principal/order-principal
    name: kafka:order-principal
  - ref: kafka://cluster1/principal/order-principal/topic/order-events/write
    name: kafka:order-events
  - ref: kafka://cluster1/principal/order-principal/topic/customer-events/read
    name: kafka:customer-events
  - ref: github://my-tenant/team/order-team
    name: github:order-team
```

Define through which identity a workload provides or requires resources. This metadata can be used
for all kind of different modules from different suppliers. For different components
sub-specifications can be defined and modules can be made.

We could:

- Use metadata to start request process if resource is not yet provisioned.
- Automate provisioning.
- Validate consistency between systems, find unused resources.
- Use metadata to update CMDB items.
- Use metadata for CISO risk analysis.

The idea is that Open Workload Governance is the specification that platforms and tools can use to
exchange metadata.

References are used for easy override of values on different environments.

Also the referred systems are workloads defining their own "Open Workload Governance metadata.

This site documents a proposal. It does not provide a live governance API or claim a stable
standard.
