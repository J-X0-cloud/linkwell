import Link from "next/link";
import { footerColumns, legalLinks, siteConfig } from "@/lib/data/site";
import { LogoMark } from "@/components/layout/LogoMark";

function FooterLink({ href, children }: { href: string; children: string }) {
  return /^(mailto:|https?:)/.test(href) ? <a href={href}>{children}</a> : <Link href={href}>{children}</Link>;
}

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" href="/">
              <LogoMark />
              <span>linkwell</span>
            </Link>
            <p>{siteConfig.tagline}</p>
            <a className="status" href={siteConfig.statusUrl}>
              <i />
              All systems operational
            </a>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              {column.links.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          ))}
        </div>
        <div className="foot-base">
          <span>© 2026 Linkwell, Inc. All rights reserved.</span>
          <span>
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
