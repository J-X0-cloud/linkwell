import { authCard } from "@/lib/data/mockups";
import { cn } from "@/lib/cn";
import { Tile } from "@/components/ui/Tile";

/** The connect flow a tenant sees when authorizing QuickBooks from inside the host product. */
export function AuthCard() {
  return (
    <div className="auth-card" aria-hidden="true">
      <div className="ac-head">
        <Tile tone={5}>Qb</Tile>
        <div>
          <b>{authCard.title}</b>
          <em>{authCard.subtitle}</em>
        </div>
      </div>
      <ol className="ac-steps">
        {authCard.steps.map((step) => (
          <li key={step.label} className={step.state}>
            <i />
            {step.label}
          </li>
        ))}
      </ol>
      <div className="ac-opts">
        {authCard.options.map((option) => (
          <label key={option.label} className={cn(option.on && "on")}>
            <span className="cb" />
            {option.label}
          </label>
        ))}
      </div>
      <div className="ac-foot">
        <span className="muted">Secured by Linkwell</span>
        <span className="btn btn-sm">Save &amp; start sync</span>
      </div>
    </div>
  );
}
