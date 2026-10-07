---
title: Workload Specification
description: OWG Workload Specification, version 0.1 Draft, status Proposal.
weight: 20
---

**Version:** 0.1 Draft  
**Status:** Proposal

The primary responsibility of OWG is to establish governance ownership, not identity management. The
generic Workload object records ownership, identities, resources, provided capabilities,
dependencies, access intents, and governance requirements through external references.

## Draft Contents

- [Workload Object](workload/): the complete service example and its fields.
- [Ownership And Governance](ownership/): owners, approvers, change management, and controls.
- [Reference Resolution](resolution/): named references, external targets, and open lookup rules.

## Interpretation

Examples illustrate the proposal; they do not define a complete validation schema or API contract.
The example `v1` API namespace is not a declaration that the specification is stable.

This example supersedes the earlier Context object and generic `spec.type` / `spec.id` subject
references. The identities fragment has been normalized into valid YAML, as noted on the object
page. The draft version remains 0.1 until a new version is agreed.

See the [Project Roadmap](../../project/) for unresolved decisions. No conformance or enforcement
behavior is claimed.
