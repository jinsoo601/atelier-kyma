import type { ReactNode } from "react";

export default function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: ReactNode }) {
  return (
    <div className="page-title">
      <div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div>
      {description && <p>{description}</p>}
    </div>
  );
}
