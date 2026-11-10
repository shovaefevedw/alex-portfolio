import fs from "fs";
import path from "path";

/**
 * EYEBALL 项目页。
 * 幻灯片放在 public/images/eyeball/slides/，文件名 slide-01.webp、slide-02.webp…
 * 页数按目录里实际存在的文件计算，不补不存在的页。
 */

export const eyeball = {
  number: "02",
  series: "Selected Work",
  title: "Eyeball",
  headline: "Who decides what art is worth?",
  description:
    "EYEBALL explores the relationship between art, human attention, and ownership, proposing new ways for audiences to participate in the art ecosystem.",
  category: "Creative Technology / Product Design",
  width: 1920,
  height: 1080,
};

export type EyeballSlide = {
  src: string;
  alt: string;
};

export function getEyeballSlides(): EyeballSlide[] {
  const dir = path.join(process.cwd(), "public/images/eyeball/slides");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => /^slide-\d+\.webp$/.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file, index) => {
      const label = String(index + 1).padStart(2, "0");
      return {
        src: `/images/eyeball/slides/${file}`,
        alt: `Eyeball presentation, slide ${label}`,
      };
    });
}
