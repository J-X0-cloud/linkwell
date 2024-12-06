import { heroApp } from "@/lib/data/mockups";
import { cn } from "@/lib/cn";
import { StatusCode } from "@/components/ui/StatusCode";
import { Tile } from "@/components/ui/Tile";

/** A host product (Fieldnote) with the Linkwell marketplace embedded in its settings. */
export function HeroMock() {
  const { sync } = heroApp;
  const progress = Math.round((sync.done / sync.total) * 100);

  return (
    <div className="hero-mock" aria-hidden="true">
      <div className="win">
        <div className="win-bar">
          <i />
          <i />
          <i />
          <span className="url">{heroApp.url}</span>
        </div>
        <div className="app">
          <aside className="app-side">
            <div className="app-logo">
              <b>{heroApp.product.charAt(0)}</b>
              {heroApp.product}
            </div>
            {heroApp.nav.map((item) => (
              <span key={item} className={cn(item === heroApp.active && "on")}>
                {item}
              </span>
            ))}
          </aside>
          <div className="app-main">
            <div className="app-head">
              <div>
                <h5>Integrations</h5>
                <p>Connect the tools your team already uses.</p>
              </div>
              <div className="search">{heroApp.search}</div>
            </div>
            <div className="chips">
              {heroApp.chips.map((chip, i) => (i === 0 ? <b key={chip}>{chip}</b> : <span key={chip}>{chip}</span>))}
            </div>
            <div className="mk-grid">
              {heroApp.apps.map((app) => (
                <div key={app.name} className="mk">
                  <Tile tone={app.tone}>{app.mono}</Tile>
                  <div>
                    <strong>{app.name}</strong>
                    <em>{app.objects}</em>
                  </div>
                  <span className={cn("pill", app.connected && "ok")}>{app.connected ? "Connected" : "Connect"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="float f-sync">
        <div className="fs-top">
          <span className="dot run" />
          <b>Sync running</b>
          <em>{sync.schedule}</em>
        </div>
        <div className="fs-flow">
          <Tile tone={1} size="sm">
            Hs
          </Tile>
          <span className="arrow" />
          <Tile tone="brand" size="sm">
            F
          </Tile>
          <span className="fs-lbl">{sync.label}</span>
        </div>
        <div className="bar">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="fs-meta">
          <span>
            {sync.done.toLocaleString("en-US")} of {sync.total.toLocaleString("en-US")} records
          </span>
          <span>{sync.errors} errors</span>
        </div>
      </div>

      <div className="float f-hook">
        <StatusCode status={heroApp.hook.status} />
        <div>
          <b>{heroApp.hook.event}</b>
          <em>{heroApp.hook.detail}</em>
        </div>
      </div>
    </div>
  );
}
