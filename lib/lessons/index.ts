import { getChapterByNumber } from "../curriculum";
import { complexLessons } from "./complex";
import { seriesLessons } from "./series";

export const lessonCollections = [
  { chapter: 1, lessons: seriesLessons },
  { chapter: 2, lessons: complexLessons },
];

export function getLessonContext(slug: string) {
  const collection = lessonCollections.find(({ lessons }) => lessons.some((lesson) => lesson.slug === slug));
  if (!collection) return undefined;
  const lesson = collection.lessons.find((item) => item.slug === slug)!;
  const chapter = getChapterByNumber(collection.chapter)!;
  return { lesson, lessons: collection.lessons, chapter };
}
