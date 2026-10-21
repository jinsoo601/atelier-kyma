import type { Metadata } from "next";
import Image from "next/image";
import { artworks, contact } from "@/content/gallery";
import archive from "@/content/archive.json";
import PageTitle from "@/components/gallery/PageTitle";

export const metadata: Metadata = { title: "문의" };

type Props = { searchParams: Promise<{ artwork?: string }> };

export default async function InquiriesPage({ searchParams }: Props) {
  const { artwork: artworkSlug } = await searchParams;
  const selected = artworks.find((artwork) => artwork.slug === artworkSlug);
  return (
    <main className="shell">
      <PageTitle eyebrow="CONTACT & VISIT" title="문의" description="작품, 구매, 전시 또는 방문에 관해 연락해 주세요." />
      <div className="contact-grid">
        <div>
          <section className="contact-block"><h2>이메일 / EMAIL</h2><a href={`mailto:${contact.email}`}>{contact.email} ↗</a></section>
          <section className="contact-block"><h2>전화 / PHONE</h2><a href={contact.phoneHref}>{contact.phoneDisplay} ↗</a></section>
          <section className="contact-block"><h2>주소 / ADDRESS</h2><p>{contact.address}</p><small>방문 전 운영시간을 확인해 주세요.</small></section>
          <section className="contact-block"><h2>영업시간 / HOURS</h2><p>{contact.hours.map((line) => <span key={line}>{line}<br /></span>)}</p></section>
          <section className="contact-block"><h2>인스타그램 / INSTAGRAM</h2><a href={`https://www.instagram.com/${contact.instagram}/`} target="_blank" rel="noopener noreferrer">@{contact.instagram} ↗</a></section>
          <figure className="contact-photo"><Image src={archive.contact.image} alt="아뜰리에 키마 갤러리" fill sizes="(max-width: 800px) 100vw, 40vw" /></figure>
        </div>
        <div>
          <h2 className="form-title">작품 구매 문의</h2>
          <p className="form-intro">문의만으로 작품이 예약되지는 않습니다. 갤러리가 재고와 배송 방법을 확인해 답변드립니다.</p>
          {selected && <p className="selected-artwork">문의 작품: {selected.title}</p>}
          <p className="form-intro">온라인 문의 접수 준비 중입니다. 현재는 이메일이나 전화로 문의해 주세요.</p>
          <a className="primary-button" href={`mailto:${contact.email}${selected ? `?subject=${encodeURIComponent(`${selected.title} 구매 문의`)}` : ""}`}>이메일로 문의하기</a>
          <div className="inquiry-form" aria-label="온라인 문의 양식 미리보기">
            <label htmlFor="inquiry-name">성함</label><input id="inquiry-name" name="name" autoComplete="name" disabled />
            <label htmlFor="inquiry-email">이메일</label><input id="inquiry-email" type="email" name="email" autoComplete="email" disabled />
            <label htmlFor="inquiry-message">문의 내용</label><textarea id="inquiry-message" name="message" disabled />
            <button className="secondary-button" type="button" disabled>온라인 문의 준비 중</button>
          </div>
        </div>
      </div>
    </main>
  );
}
