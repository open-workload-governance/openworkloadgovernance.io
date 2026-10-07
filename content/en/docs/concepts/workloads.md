---
title: Workloads
description: A generic object for workload ownership, dependencies, and governance.
weight: 10
aliases: [/docs/concepts/contexts/]
---

A Workload describes a governed service or other workload through its metadata, ownership,
classification, identities, resources, capabilities, dependencies, and access intents. The example
describes `shop-api`, a customer-facing webshop API with `metadata.type: service`. The permitted
workload types have not yet been defined.

## Questions A Workload Answers

- What is this workload, and what type of workload is it?
- Who owns it, and who can approve governance actions?
- Which environment and data classification apply?
- Which identities and resources are associated with it?
- Which APIs and scopes does it provide?
- Which services and resources does it require?
- Which actions are intended between identities and targets?
- Which change-management, approval, and control requirements apply?

## Description Is Not Enforcement

Declaring ownership, required scopes, or an access intent does not provision an identity, grant
access, or authorize a deployment. Participating systems need explicit validation and enforcement
contracts. The draft describes desired governance relationships, not an implemented control plane.

See the [Workload Object](../../specification/workload/) for the complete representation.
