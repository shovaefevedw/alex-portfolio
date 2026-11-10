import { Frame } from "@/components/Frame";
import { site } from "@/data/site";

export function Contact() {
  const email = site.contact.channels.find((channel) => channel.label === "Email");

  return (
    <section id="contact" data-header-theme="dark" className="bg-dark text-paper">
      <Frame className="flex min-h-[72svh] flex-col pb-16 pt-28 md:pb-20 md:pt-36">
        <p className="kicker text-mist">{site.contact.label}</p>
        <div className="mt-auto pt-16">
          <h2 className="font-medium uppercase leading-[0.86] tracking-[-0.05em] text-[clamp(3rem,6.4vw,5.5rem)]">
            <span className="block">Let&apos;s</span>
            <span className="block">
              talk
              <span aria-hidden="true" className="ml-[0.16em] inline-block text-[0.62em] text-accent">
                ↗
              </span>
            </span>
          </h2>
        </div>

        {email ? (
          <div className="mt-12 border-t border-paper/15 pt-8">
            <a
              href={email.href}
              className="inline-flex items-center gap-3 text-[1.15rem] text-paper transition-colors duration-300 hover:text-accent"
            >
              <EmailIcon />
              <span className="link-line">{email.text}</span>
            </a>
          </div>
        ) : null}
      </Frame>
    </section>
  );
}

function EmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6.5 12 12.5 20 6.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
