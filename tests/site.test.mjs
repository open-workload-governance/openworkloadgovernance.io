import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";
import { parse } from "yaml";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "public");
const origin = "https://openworkloadgovernance.io";
const pages = [
  "",
  "docs",
  "docs/concepts",
  "docs/concepts/workloads",
  "docs/concepts/references",
  "docs/specification",
  "docs/specification/workload",
  "docs/specification/ownership",
  "docs/specification/resolution",
  "docs/examples",
  "project",
];

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const location = path.join(directory, entry.name);
    return entry.isDirectory()
      ? htmlFiles(location)
      : entry.name.endsWith(".html")
        ? [location]
        : [];
  });
}

test("English documentation and proposal pages are published", () => {
  for (const page of pages) {
    const document = load(readFileSync(path.join(output, page, "index.html"), "utf8"));
    assert.equal(document("html").attr("lang"), "en");
    assert.ok(document("h1").text().trim(), `${page}: missing heading`);
    assert.match(document("title").text(), /Open Workload Governance/);
  }
  const specification = load(
    readFileSync(path.join(output, "docs/specification/index.html"), "utf8"),
  );
  assert.match(specification("main").text(), /0\.1 Draft/);
  assert.match(specification("main").text(), /Proposal/);
});

test("internal links, anchors, and local assets resolve", () => {
  for (const filename of htmlFiles(output)) {
    const document = load(readFileSync(filename, "utf8"));
    const relative = path.relative(output, filename).split(path.sep).join("/");
    const pageUrl = new URL(
      relative.endsWith("index.html") ? relative.slice(0, -10) : relative,
      origin,
    );
    for (const element of document("a[href], img[src], script[src], link[href]").toArray()) {
      const reference = document(element).attr("href") ?? document(element).attr("src");
      const url = new URL(reference, pageUrl);
      if (url.origin !== origin) continue;
      const target = path.join(output, decodeURIComponent(url.pathname));
      const resolved = url.pathname.endsWith("/") ? path.join(target, "index.html") : target;
      assert.ok(existsSync(resolved), `${relative}: missing ${reference}`);
      if (url.hash && resolved.endsWith(".html")) {
        const destination = load(readFileSync(resolved, "utf8"));
        const anchor = decodeURIComponent(url.hash.slice(1));
        assert.ok(
          destination("[id]")
            .toArray()
            .some((node) => destination(node).attr("id") === anchor),
          `${relative}: missing anchor ${reference}`,
        );
      }
    }
  }
});

test("downloadable Workload matches the documented YAML and resolves ownership names", () => {
  const example = parse(readFileSync(path.join(root, "examples/workload-shop-api.yaml"), "utf8"));
  const published = parse(
    readFileSync(path.join(output, "examples/workload-shop-api.yaml"), "utf8"),
  );
  const document = load(
    readFileSync(path.join(output, "docs/specification/workload/index.html"), "utf8"),
  );
  const snippet = document("pre code").first().text();
  assert.deepEqual(parse(snippet), example);
  assert.deepEqual(published, example);
  assert.equal(example.apiVersion, "openworkloadgovernance.io/v1alpha1");
  assert.equal(example.kind, "Workload");
  assert.equal(example.metadata.type, "service");
  assert.equal(example.metadata.name, "shop-api");
  const references = new Map(example.references.map(({ name, ref }) => [name, ref]));
  assert.equal(references.size, example.references.length);
  for (const name of [...example.ownership.owners, ...example.ownership.approvers]) {
    assert.ok(references.has(name), `Missing reference: ${name}`);
  }
  assert.equal(example.identities[0].tokens[0].ref, "github://token/shop-api-token");
  assert.equal(example.identities[1].ref, "entra://managed-identity/shop-api");
  assert.equal(example.resources.length, 4);
  assert.equal(example.provides.apis[0].scopes.length, 4);
  assert.equal(example.requires.length, 4);
  assert.equal(example.accessIntents.length, 2);
  assert.deepEqual(example.governance.approvals.requiredFor, [
    "production-deployment",
    "access-change",
  ]);
  assert.ok([...references.values()].includes(example.governance.approvals.approvers[0].ref));
});
