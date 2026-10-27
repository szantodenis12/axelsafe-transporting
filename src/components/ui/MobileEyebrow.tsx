/**
 * Section label shown on phones only ("02 / WHAT WE DO"), above the heading — the orientation rule of the mobile layout system
 * (docs/MOBILE.md). It renders the section's existing eyebrow text from the dictionary; on desktop it is not rendered visually.
 * `plain` drops the leading "NN / " index, for pages whose eyebrows are not numbered in one running sequence (services).
 */
export function MobileEyebrow({ children, plain = false, className = "" }: { children?: string; plain?: boolean; className?: string }) {
  if (!children) return null;
  const text = plain ? children.replace(/^\d+\s*\/\s*/, "") : children;
  return <p className={`m-eyebrow t-label md:hidden ${className}`}>{text}</p>;
}
