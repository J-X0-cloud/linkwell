"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const k = (text: string) => <span className="k">{text}</span>;
const v = (text: string) => <span className="v">{text}</span>;
const s = (text: string) => <span className="s">{text}</span>;
const f = (text: string) => <span className="f">{text}</span>;
const p = (text: string) => <span className="p">{text}</span>;
const c = (text: string) => <span className="c">{text}</span>;

const snippets: Record<"React" | "Vanilla JS" | "REST", ReactNode> = {
  React: (
    <>
      {k("import")} {"{ "}
      {v("LinkwellMarketplace")}
      {" } "}
      {k("from")} {s('"@linkwell/embed"')};{"\n\n"}
      {k("export function")} {f("IntegrationsPage")}
      {"({ user }) {\n  "}
      {k("return")}
      {" (\n    <"}
      {v("LinkwellMarketplace")}
      {"\n      tenantId={user."}
      {p("accountId")}
      {"}\n      token={user."}
      {p("linkwellToken")}
      {"}   "}
      {c("// from your API")}
      {"\n      theme="}
      {s('"inherit"')}
      {"\n      categories={["}
      {s('"crm"')}, {s('"accounting"')}
      {"]}\n      onConnect={(c) => track("}
      {s('"integration_connected"')}
      {", c)}\n    />\n  );\n}"}
    </>
  ),
  "Vanilla JS": (
    <>
      {k("import")} {s('"@linkwell/embed/element"')};{"\n\n"}
      {k("const")} {v("el")} = document.{f("querySelector")}({s('"linkwell-marketplace"')});{"\n"}
      el.{p("tenantId")} = user.{p("accountId")};{"\n"}
      el.{p("token")} = {k("await")} {f("fetchLinkwellToken")}();{"   "}
      {c("// from your API")}
      {"\n"}
      el.{f("addEventListener")}({s('"connect"')}, (e) =&gt; {f("track")}({s('"integration_connected"')}, e.detail));
    </>
  ),
  REST: (
    <>
      {c("# Mint a short-lived tenant token on your backend")}
      {"\n"}
      {k("curl")} -X POST https://api.linkwell.com/v1/tenants/{p("acct_48sK")}/tokens \{"\n"}
      {"  "}-H {s('"Authorization: Bearer $LINKWELL_SECRET_KEY"')} \{"\n"}
      {"  "}-d {s("'{\"ttl_seconds\": 900}'")}
      {"\n\n"}
      {c("# → { \"token\": \"lwt_…\", \"expires_at\": \"2026-09-25T14:17:00Z\" }")}
    </>
  ),
};

type Tab = keyof typeof snippets;

export function CodeBox() {
  const [tab, setTab] = useState<Tab>("React");

  return (
    <div className="codebox">
      <div className="code-top" role="tablist" aria-label="Embed example">
        {(Object.keys(snippets) as Tab[]).map((name) => (
          <button key={name} type="button" role="tab" aria-selected={tab === name} className={cn(tab === name && "on")} onClick={() => setTab(name)}>
            {name}
          </button>
        ))}
      </div>
      <pre>{snippets[tab]}</pre>
    </div>
  );
}
