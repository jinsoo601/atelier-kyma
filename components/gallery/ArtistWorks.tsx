"use client";

import { useState } from "react";
import Link from "next/link";
import type { ArtistWork } from "@/content/gallery";
import GalleryImageFrame from "./GalleryImage";

export default function ArtistWorks({ slug, works }: { slug: string; works: ArtistWork[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleWorks = expanded ? works : works.slice(0, 6);
  const gridId = `artist-works-${slug}`;

  return (
    <>
      <div id={gridId} className="artist-work-grid">
        {visibleWorks.map((work) => {
          const card = (
            <>
              <GalleryImageFrame image={work} sizes="(max-width: 800px) 48vw, 30vw" />
              <figcaption>
                {work.title}
                {work.artworkSlug && <span className="work-status">{work.priceLabel} · 작품 상세 보기 ↗</span>}
              </figcaption>
            </>
          );
          return (
            <figure className="artist-work-card" key={work.id}>
              {work.artworkSlug ? <Link href={`/artworks/${work.artworkSlug}`} aria-label={`${work.title} 작품 상세 보기`}>{card}</Link> : card}
            </figure>
          );
        })}
      </div>
      {works.length > 6 && (
        <div className="artist-work-actions">
          <button className="artist-work-toggle" type="button" aria-controls={gridId} aria-expanded={expanded} onClick={() => setExpanded((current) => !current)}>
            {expanded ? "접기" : "더보기"}
          </button>
        </div>
      )}
    </>
  );
}
