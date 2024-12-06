import { planComparison, plans } from "@/lib/data/pricing";
import { cn } from "@/lib/cn";
import { SectionHead } from "@/components/ui/SectionHead";

export function PlanComparison() {
  return (
    <section className="sec sec-tint">
      <div className="wrap">
        <SectionHead eyebrow="Compare plans" heading="The details, side by side." />
        <div className="tbl compare-wrap">
          <table className="compare plans-t">
            <thead>
              <tr>
                <th />
                {plans.map((plan) => (
                  <th key={plan.id} className={cn(plan.popular && "us")}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planComparison.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  {row.values.map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
