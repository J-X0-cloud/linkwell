"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { mainNav, siteConfig } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/layout/LogoMark";

export function SiteHeader() {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (drawerRef.current) drawerRef.current.open = false;
  }, [pathname]);

  const links = mainNav.map((link) => (
    <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
      {link.label}
    </Link>
  ));

  return (
    <header className="top">
      <div className="wrap nav">
        <Link className="brand" href="/" aria-label="Linkwell home">
          <LogoMark />
          <span>linkwell</span>
        </Link>
        <nav className="links" aria-label="Main">
          {links}
          <a href={siteConfig.docsUrl}>Docs</a>
        </nav>
        <div className="nav-cta">
          <a className="signin" href={siteConfig.appUrl}>
            Sign in
          </a>
          <ButtonLink href={siteConfig.salesEmail} size="sm">
            Book a demo
          </ButtonLink>
        </div>
        <details className="burger" ref={drawerRef}>
          <summary aria-label="Menu">
            <span />
            <span />
            <span />
          </summary>
          <div className="drawer">
            {links}
            <a href={siteConfig.docsUrl}>Docs</a>
            <a href={siteConfig.appUrl}>Sign in</a>
            <a className="btn" href={siteConfig.salesEmail}>
              Book a demo
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
