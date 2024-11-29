import Link from "next/link";

export function TextLink({ href, children }: { href: string; children: string }) {
  if (/^(mailto:|https?:)/.test(href)) {
    return (
      <a className="textlink" href={href}>
        {children}
      </a>
    );
  }
  return (
    <Link className="textlink" href={href}>
      {children}
    </Link>
  );
}
