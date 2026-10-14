import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        {site.masthead} — curated by {site.author} · © {new Date().getFullYear()}
      </span>
      <div className="colophon">
        <div className="colophon-text">
          <span className="name">{site.author}</span>
          <span className="role">
            {site.role} · {site.company}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="colophon-logo"
          src={site.logo}
          alt={`${site.company} logo`}
          width={40}
          height={40}
        />
      </div>
    </footer>
  );
}
