import Link from "next/link";
import type { ReactNode } from "react";

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = `group inline-flex items-center gap-2 kicker ${className}`;
  const content = (
    <>
      <span className="link-line">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        ↗
      </span>
    </>
  );

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
