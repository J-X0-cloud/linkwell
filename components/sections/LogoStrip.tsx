import { customerLogos } from "@/lib/data/site";

export function LogoStrip({ label }: { label: string }) {
  return (
    <section className="logos">
      <div className="wrap">
        <p>{label}</p>
        <div className="logo-row">
          {customerLogos.map((logo) => (
            <span key={logo.name} className={logo.style}>
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
