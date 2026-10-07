---
title: Ownership And Governance
description: Named owners and approvers, change management, and governance controls.
weight: 20
---

**Version:** 0.1 Draft · **Status:** Proposal

## Owners And Approvers

```yaml
ownership:
  owners:
    - omada:team
    - servicenow:group
  approvers:
    - omada:role:customer-owner
    - omada:role:platform-owner
```

These names map to entries in the Workload's `references` list. The example assigns ownership to an
Omada team and a ServiceNow group, and identifies customer-owner and platform-owner roles as
approvers. Referencing a party does not define its membership or grant permissions.

## Change Management

```yaml
governance:
  changeManagement:
    required: true
    provider:
      ref: servicenow://assignment-group/customer-platform
```

The example requires change management and references the responsible provider. It does not define
ticket creation, change states, or the conditions under which a deployment may proceed.

## Approval Requirements

```yaml
governance:
  approvals:
    requiredFor:
      - production-deployment
      - access-change
    approvers:
      - ref: omada://role/customer-owner
```

Here the customer-owner role is referenced directly, while `ownership.approvers` names both
customer-owner and platform-owner. The draft must define how these lists interact; consumers must
not assume a union, override, quorum, or approval ordering.

## Controls

```yaml
governance:
  controls:
    backupOwnerRequired: true
    recertificationRequired: true
```

These flags express requirements. The example does not specify a backup-owner field, a
recertification schedule, evidence, or enforcement behavior. Those contracts remain open.
