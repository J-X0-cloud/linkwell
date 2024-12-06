import { buildVsBuy } from "@/lib/data/platform";
import { SectionHead } from "@/components/ui/SectionHead";

export function BuildVsBuy() {
  return (
    <section className="sec sec-tint">
      <div className="wrap">
        <SectionHead eyebrow={buildVsBuy.eyebrow} heading={buildVsBuy.heading} />
        <div className="tbl compare-wrap">
          <table className="compare">
            <thead>
              <tr>
                <th />
                <th className="us">With Linkwell</th>
                <th>Built in-house</th>
              </tr>
            </thead>
            <tbody>
              {buildVsBuy.rows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  <td className="yes">{row.linkwell}</td>
                  <td>{row.inHouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
