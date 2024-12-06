import { complianceBadges } from "@/lib/data/security";

export function ComplianceBadges() {
  return (
    <section className="sec pt0">
      <div className="wrap">
        <div className="badges">
          {complianceBadges.map((badge) => (
            <div key={badge.title} className="badge-card">
              <span className="shield">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6l7-3z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M8.8 12l2.2 2.2 4.2-4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3>{badge.title}</h3>
              <p>{badge.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
