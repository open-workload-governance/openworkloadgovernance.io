---
title: References
description: Connect workload governance to external systems without managing their identities.
weight: 20
aliases: [/docs/concepts/subjects/]
---

OWG does not prescribe an identity provider. The Workload example connects external systems using
named references and direct `ref` values, rather than defining users, groups, or teams itself.

## Named References

Ownership lists names whose external targets are declared in `references`:

```yaml
ownership:
  owners:
    - omada:team
    - servicenow:group
references:
  - ref: omada://team/shop-team
    name: omada:team
  - ref: servicenow://group/customer-platform
    name: servicenow:group
```

`omada:team` is a local reference name in this example, not a universal subject type. Matching it to
the reference entry identifies `omada://team/shop-team` as the external target. The example also
names roles, a business service, a component, and a repository.

## Direct References

Identities, resources, access-intent endpoints, and governance providers use `ref` directly:

```yaml
source:
  ref: github://oidc/shop-api-prod
target:
  ref: kubernetes://namespace/shop
```

These values identify external objects; they are not necessarily browser URLs or standardized
protocols. The scheme names illustrate integrations, not implemented connectors or partnerships.
Token references identify tokens without embedding credentials in the workload document.

## Resolution Boundaries

OWG records relationships while the referenced systems remain responsible for their own data. Name
uniqueness, reference grammar, credential handling, supported schemes, and unresolved targets still
need specification decisions. See [Reference Resolution](../../specification/resolution/).
