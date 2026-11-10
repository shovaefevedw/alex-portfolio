/**
 * 作品数据。首页三个项目的标题、分类、简介、图片都在这里改。
 *
 * 图片目录（直接替换文件，或改下面的 src）：
 *   public/images/birds/     鸟系列摄影，文件名保持原编号
 *   public/images/eyeball/   Eyeball
 *   public/images/sticky/    Sticky 静帧，例如 still.jpg
 *   public/images/about/     关于我的照片（首页暂未使用）
 * 视频目录：
 *   public/videos/           例如 sticky.mp4
 *
 * 换图时请同时改 width 和 height，填图片的真实像素尺寸。
 * Sticky 若要悬停静音预览，把 video 写成 "/videos/sticky.mp4"。
 * 没有图片时，页面会显示一个只带标题的中性占位，不会生成假作品图。
 */

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectLayout = "photographic" | "structured" | "cinematic";

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  year?: string;
  description: string;
  layout: ProjectLayout;
  image?: ProjectImage;
  video?: string;
};

export const projects: Project[] = [
  {
    slug: "birds-in-the-cage",
    number: "01",
    title: "Birds in the Cage",
    category: "Conceptual Photography / Visual Research",
    description:
      "An exploration of freedom, confinement, and the invisible boundaries of everyday life.",
    layout: "photographic",
    image: {
      src: "/images/birds/641561g15.jpg",
      width: 1544,
      height: 1022,
      alt: "A lorikeet seen through cage bars, from Birds in the Cage",
    },
  },
  {
    slug: "eyeball",
    number: "02",
    title: "Eyeball",
    category: "Product Design / Creative Technology",
    description:
      "Exploring new relationships between art, human attention, and technology.",
    layout: "structured",
    image: {
      src: "/images/eyeball/poster.jpg",
      width: 2000,
      height: 2833,
      alt: "Eyeball poster: a crowd overlaid with attention-tracking boxes",
    },
  },
  {
    slug: "sticky",
    number: "03",
    title: "Sticky",
    category: "AI Music Video / Experimental Media",
    year: "2023",
    description:
      "An experiment in human–AI collaboration through original electronic music and moving images.",
    layout: "cinematic",
    image: {
      src: "/images/sticky/cover-home.jpg",
      width: 1024,
      height: 492,
      alt: "Sticky still: a flower-covered figure beneath a pink star",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
