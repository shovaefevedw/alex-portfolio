/**
 * Birds in the Cage — 图片清单与阅读顺序。
 *
 * 45 张原作各出现一次。顺序按画面内容编排，不按文件名。
 * 每一段正文配一张照片（pairs）。同章其余照片进入小图（tiles），点击放大。
 * 调整时只移动 pairs / tiles 里的 id，并保持每张只出现一次。
 *
 * 章节：
 *   introduction  开篇
 *   visible       01 / The Visible Cage
 *   invisible     02 / The Invisible Cage
 *   frame         03 / The Frame Is the Cage
 *
 * place：照片在文字左侧或右侧。size：s / m / l，只影响配文那一张的大小。
 */

export type BirdChapter = "introduction" | "visible" | "invisible" | "frame";

export type BirdLayout = "paired" | "tile";

export type BirdImage = {
  id: string;
  file: string;
  src: string;
  width: number;
  height: number;
  ratio: number;
  alt: string;
};

export type BirdPair = {
  text: string;
  image: string;
  place: "left" | "right";
  size: "s" | "m" | "l";
};

export type BirdChapterContent = {
  id: Exclude<BirdChapter, "introduction">;
  title: string;
  statement: string;
  pairs: BirdPair[];
  tiles: string[];
};

const catalog: Array<[string, number, number, string]> = [
  ["g1", 1545, 1022, "Extreme close-up of a lovebird's eye"],
  ["g2", 1540, 1023, "Two finches perched in a pink wash of light"],
  ["g3", 1552, 1026, "A hand reaching through the bars of a cage"],
  ["g4", 1546, 1025, "The shadow of a bird and cage bars in warm light"],
  ["g5", 1544, 1019, "Two birds behind a field of blue bars"],
  ["g6", 1543, 1019, "The dark silhouette of a bird against yellow light"],
  ["g7", 1544, 1023, "Birds perched inside a brightly lit cage"],
  ["g8", 1541, 1023, "A zebra finch seen through vertical bars"],
  ["g9", 1543, 1026, "An orange blur, the subject nearly dissolved"],
  ["g10", 1546, 1023, "Two parrots touching beaks"],
  ["g11", 1547, 1027, "A bird's feet gripping cage bars"],
  ["g12", 1547, 1016, "A parrot in profile against a magenta field"],
  ["g13", 1545, 1026, "A bird climbing the wires of a cage"],
  ["g14", 1545, 1028, "Two lovebirds face to face"],
  ["g15", 1544, 1022, "A lorikeet seen through cage bars"],
  ["g16", 1542, 1023, "Two pale birds in a green haze"],
  ["g17", 1543, 1021, "A bird reduced to a red silhouette"],
  ["g18", 542, 821, "A yellow bird on a white perch"],
  ["g19", 544, 824, "A dark bird against red and green light"],
  ["g20", 547, 829, "A finch with a red head behind soft bars"],
  ["g21", 545, 828, "A bird hanging among the bars of a cage"],
  ["g22", 546, 832, "A blue, nearly abstract close view of a bird"],
  ["g23", 545, 824, "A budgie's face in green light"],
  ["g24", 548, 821, "A cockatiel in warm, close light"],
  ["g25", 547, 825, "A bird softened by haze, perched in a cage"],
  ["g26", 547, 823, "A close view of patterned feathers in green light"],
  ["g27", 544, 822, "The silhouette of a bird with a band on its leg"],
  ["g28", 547, 826, "An extreme close view of an eye and feathers"],
  ["g29", 548, 824, "A bird caught in overlapping motion"],
  ["g30", 548, 825, "The eye of a pale bird"],
  ["g31", 544, 820, "An orange silhouette of a bird"],
  ["g32", 548, 824, "A lovebird against an empty violet ground"],
  ["g33", 570, 830, "Two birds facing one another"],
  ["g34", 545, 823, "A blurred bird's face in blue and orange"],
  ["g35", 547, 827, "A finch in profile on a pink ground"],
  ["g36", 544, 827, "An extreme close-up of a lovebird's face"],
  ["g37", 540, 823, "A bird seen through bars in shifting color"],
  ["g38", 545, 823, "A bird's shape broken into color"],
  ["g39", 542, 822, "A bird silhouetted against a pale window"],
  ["g40", 547, 825, "An orange monochrome silhouette of a bird"],
  ["g41", 545, 828, "A soft orange blur of a bird"],
  ["g42", 546, 828, "A bird split across unnatural color"],
  ["g43", 547, 829, "A cockatiel perched in yellow light"],
  ["g44", 544, 825, "A faint pink blur where the subject recedes"],
  ["g45", 548, 821, "A cockatoo held in blue light"],
];

export const birds: BirdImage[] = catalog.map(([id, width, height, alt]) => ({
  id,
  file: `641561${id}.jpg`,
  src: `/images/birds/641561${id}.jpg`,
  width,
  height,
  ratio: Math.round((width / height) * 1000) / 1000,
  alt,
}));

export const birdById: Record<string, BirdImage> = Object.fromEntries(
  birds.map((bird) => [bird.id, bird]),
);

export const book = {
  title: "Birds in the Cage",
  subtitle: "The frame is the cage.",
  category: "Conceptual Photography / Visual Research",
  pairs: [
    {
      text: "Birds have long been romanticized as symbols of freedom. Yet freedom itself is often defined by those who observe it.",
      image: "g4",
      place: "right",
      size: "l",
    },
    {
      text: "We recognize confinement through visible boundaries—cages, walls, and barriers. But what about the boundaries we cannot see?",
      image: "g11",
      place: "left",
      size: "m",
    },
    {
      text: "Birds in the Cage explores the paradox of freedom and confinement, questioning whether freedom exists independently of the way we perceive it.",
      image: "g17",
      place: "right",
      size: "s",
    },
  ] satisfies BirdPair[],
  chapters: [
    {
      id: "visible",
      title: "01 / The Visible Cage",
      statement: "Confinement is easy to recognize when it has walls.",
      pairs: [
        {
          text: "A cage creates a visible distinction between freedom and captivity.",
          image: "g15",
          place: "left",
          size: "l",
        },
        {
          text: "Its boundaries are physical, recognizable, and seemingly absolute.",
          image: "g5",
          place: "right",
          size: "m",
        },
        {
          text: "Yet these structures do more than restrict movement. They shape how we understand the space within them—and how we imagine the world beyond.",
          image: "g8",
          place: "left",
          size: "s",
        },
      ],
      tiles: ["g7", "g3", "g21", "g13", "g18", "g20", "g37"],
    },
    {
      id: "invisible",
      title: "02 / The Invisible Cage",
      statement: "Not all cages have bars.",
      pairs: [
        {
          text: "Freedom is often imagined as the absence of physical boundaries.",
          image: "g2",
          place: "right",
          size: "l",
        },
        {
          text: "Yet invisible structures continue to shape the possibilities of movement, choice, and existence.",
          image: "g14",
          place: "left",
          size: "m",
        },
        {
          text: "What appears to be an open space may still operate within limits we have learned not to question.",
          image: "g12",
          place: "right",
          size: "s",
        },
      ],
      tiles: ["g10", "g24", "g23", "g30", "g16", "g35", "g32", "g25", "g43", "g33", "g39"],
    },
    {
      id: "frame",
      title: "03 / The Frame Is the Cage",
      statement: "To photograph is to define a boundary.",
      pairs: [
        {
          text: "Photography introduces another form of confinement.",
          image: "g6",
          place: "left",
          size: "l",
        },
        {
          text: "Through the act of framing, the photographer determines what remains visible and what disappears.",
          image: "g36",
          place: "right",
          size: "s",
        },
        {
          text: "A living subject is extracted from its surroundings, suspended in time, and reconstructed within the limits of an image.",
          image: "g28",
          place: "left",
          size: "m",
        },
        {
          text: "The frame does not simply contain what we see. It shapes what we are able to understand.",
          image: "g9",
          place: "right",
          size: "l",
        },
      ],
      tiles: ["g22", "g29", "g27", "g31", "g40", "g45", "g34", "g26", "g19", "g38", "g41", "g44", "g42", "g1"],
    },
  ] satisfies BirdChapterContent[],
};

export function readingOrder() {
  return [
    ...book.pairs.map((pair) => pair.image),
    ...book.chapters.flatMap((chapter) => [...chapter.pairs.map((pair) => pair.image), ...chapter.tiles]),
  ];
}

function locate(id: string): { chapter: BirdChapter; layout: BirdLayout } {
  if (book.pairs.some((pair) => pair.image === id)) {
    return { chapter: "introduction", layout: "paired" };
  }
  for (const chapter of book.chapters) {
    if (chapter.pairs.some((pair) => pair.image === id)) {
      return { chapter: chapter.id, layout: "paired" };
    }
    if (chapter.tiles.includes(id)) return { chapter: chapter.id, layout: "tile" };
  }
  throw new Error(`Missing photograph ${id}`);
}

export type BirdManifestEntry = {
  filename: string;
  path: string;
  width: number;
  height: number;
  ratio: number;
  chapter: BirdChapter;
  order: number;
  layout: BirdLayout;
  alt: string;
};

export const manifest: BirdManifestEntry[] = readingOrder().map((id, index) => {
  const bird = birdById[id];
  const place = locate(id);
  return {
    filename: bird.file,
    path: bird.src,
    width: bird.width,
    height: bird.height,
    ratio: bird.ratio,
    chapter: place.chapter,
    order: index + 1,
    layout: place.layout,
    alt: bird.alt,
  };
});

const ids = readingOrder();
if (ids.length !== 45 || new Set(ids).size !== 45 || birds.length !== 45) {
  throw new Error("Birds in the Cage must include each of the 45 photographs once.");
}
