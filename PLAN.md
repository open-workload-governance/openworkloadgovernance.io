# Website Plan

## Goal

Create an English-only, documentation-first home for Open Workload Governance at
`openworkloadgovernance.io`. Start with the Workload Specification 0.1 Draft and clearly distinguish
proposal text from implemented capabilities.

## Architecture

Use Hugo extended and a pinned Docsy module, following the current site's documentation conventions.
Maintain the specification as Markdown alongside concepts and downloadable YAML examples. Keep this
folder independently buildable and ready for its own repository. Do not inherit OpenTelemetry's
multilingual configuration, telemetry, registry, specification submodules, or CI ownership workflow.

## Phase 1: Starter

- English homepage with direct routes to documentation, specification, and examples.
- Concepts for generic workloads and vendor-neutral external references.
- Workload object with named owners and approvers, classification, identities, and resources.
- Provided APIs and scopes, dependencies, access intents, change management, and governance
  controls.
- Reference-resolution guidance without claiming an HTTP API contract.
- Search, documentation navigation, readable code samples, and responsive Docsy layouts.
- Pinned dependencies, formatting, spelling, Markdown validation, and build smoke tests.
- Optional static deployment configuration and local development instructions.

Acceptance: a fresh checkout builds independently, all documented pages and examples are reachable,
internal links pass, and the site is usable on desktop and mobile. No live governance backend is
implied.

## Phase 2: Specification Decisions

Resolve these before describing the draft as implementable or stable:

- Confirm the normalized `identities` list. The supplied fragment mixed a `github:repo` mapping with
  a sequence entry; the site uses a repository `ref` with nested tokens and a separate
  managed-identity `ref`.
- Define required fields, cardinality, workload types, classifications, and naming rules.
- Define reference-name uniqueness, supported schemes, stability, and unresolved-target behavior.
- Define the relationship between `ownership.approvers` and `governance.approvals.approvers`. The
  example names two roles in ownership but only one in the governance block.
- Define API scope semantics and matching rules for `requires.service` and `requires.resource`.
- Define access-intent action vocabulary, source/target resolution, authorization, and enforcement.
- Define change-management integration, backup-owner representation, recertification schedules, and
  evidence requirements.
- Define resource matching, shared-resource conflicts, and unknown-resource behavior.
- Decide whether to expose HTTP APIs; then specify authentication, authorization, errors, encoding,
  and response envelopes. The replacement example does not provide endpoint contracts.
- Decide schema-version lifecycle: the `v1alpha1` example namespace signals a prerelease version,
  but compatibility, graduation, and stability guarantees still need definition.

Deliverables: reviewed specification, JSON Schema, and validated examples; an OpenAPI document only
if HTTP APIs are agreed. Add schema validation after the field contracts are settled.

## Phase 3: Collaboration And Release

- Establish the repository, maintainers, contribution process, and content/code licenses.
- [x] Add repository-specific CI using `npm ci`, `npm run check`, and `npm test`.
- Review keyboard accessibility, search, contrast, and mobile layouts.
- [ ] Configure the production FTP secrets and destination directory, test an upload, and verify DNS
      and HTTPS. Optional Netlify deploy-preview and branch-deploy contexts are configured.
- Add a changelog and versioned specification pages when a second version exists.

## Out Of Scope For The Starter

An ownership service, identity connectors, IAM management, policy enforcement, approval workflows,
conformance claims, translations, user accounts, analytics, and vendor integrations.
