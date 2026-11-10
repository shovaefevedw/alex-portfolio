/**
 * 首页文案与联系方式。
 *
 * 改首页句子、关于我、页脚，都在这个文件。
 * 首页底部只放邮件。href 用 mailto:，点击后由系统打开写信窗口。
 */

export type ContactChannel = {
  label: string;
  href: string;
  text: string;
};

export const site = {
  name: "Alex",
  hero: {
    lines: ["I think.", "I make.", "I explore."],
    supporting:
      "I'm Alex, an interdisciplinary creative based in New York City. I explore ideas across art, design, and technology, turning curiosity into creative experiments.",
    eyebrow: "Interdisciplinary Creative",
    location: "Based in NYC",
    status: "Currently Exploring",
    image: {
      src: "/images/birds/641561g1.jpg",
      width: 1545,
      height: 1022,
      alt: "Extreme close-up of a lovebird's eye, from Birds in the Cage",
      caption: "Birds in the Cage",
      href: "/work/birds-in-the-cage",
    },
  },
  about: {
    label: "A little about me",
    headline: ["I don't really", "fit into", "one box."],
    paragraphs: [
      "I'm Alex, an interdisciplinary creative based in New York City, currently studying at Parsons School of Design.",
      "My interests move between photography, product design, technology, music, and experimental media.",
      "Rather than treating these as separate disciplines, I see them as different ways of exploring the world.",
      "Sometimes I build products. Sometimes I take photographs. Sometimes I make music and experiment with AI.",
      "I'm interested in connecting unexpected ideas and turning curiosity into something tangible.",
    ],
    meta: [
      { label: "Location", value: "New York City" },
      { label: "Education", value: "Parsons School of Design" },
      {
        label: "Practice",
        value: "Photography / Design / Creative Technology",
      },
      {
        label: "Interests",
        value: "Art / Music / Human Behavior / Technology",
      },
    ],
  },
  contact: {
    label: "Have something in mind?",
    channels: [
      {
        label: "Email",
        href: "mailto:wuj784@newschool.edu",
        text: "wuj784@newschool.edu",
      },
    ] satisfies ContactChannel[],
  },
  footer: {
    copyright: "© 2026 Alex",
    note: "Designed with curiosity",
  },
  work: {
    title: "Selected Work",
    range: "2023 — Present",
  },
};

export const navItems = [
  { id: "index", label: "Index", hash: "#top" },
  { id: "work", label: "Work", hash: "#work" },
  { id: "about", label: "About", hash: "#about" },
  { id: "contact", label: "Contact", hash: "#contact" },
] as const;
