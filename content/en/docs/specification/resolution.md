---
title: Reference Resolution
description: Resolve named ownership references and external workload relationships.
weight: 30
---

**Version:** 0.1 Draft · **Status:** Proposal

The Workload example defines reference data, not HTTP endpoints. This static website does not
implement a lookup service. The earlier ownership and subject API examples are not a contract for
the revised model.

## Resolve A Named Owner

For `shop-api`, `ownership.owners` contains `omada:team`. Its corresponding entry is:

```yaml
references:
  - ref: omada://team/shop-team
    name: omada:team
```

A consumer can match the local name to the entry and use an appropriate external integration to
resolve the team. The same process maps `servicenow:group` and the named approver roles. Name
uniqueness and missing-reference behavior still need a formal definition.

## Discover Ownership From A Resource

A participating system could index `resources[].ref` to find workloads associated with
`aws://account/shop-prod`, then inspect their named owners. The example does not define an HTTP
request, response envelope, or how to handle multiple workloads sharing a resource.

## Resolve Direct References And Dependencies

Direct references identify identities, resources, access-intent sources and targets, and governance
providers. A `workload://customer-api` target points to another workload in the example.
Dependencies under `requires` instead use `service` or `resource` values with a `type`; they do not
all use `ref`. Their matching rules must be specified separately.

External systems remain the source of truth for their objects. A reference alone does not prove that
its target exists or that the caller has access to it.

## Open Contract Questions

- Supported schemes, reference grammar, name uniqueness, and identifier stability.
- Missing targets, duplicate names, shared resources, and dependency matching.
- Authentication, authorization, credential storage, and lookup freshness.
- Any future HTTP endpoints, errors, encoding, and response representations.

No API or conformance behavior is implied by these explanatory steps.
