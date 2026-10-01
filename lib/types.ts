/**
 * Shared content types. Mirrors the shapes the Figma file models as
 * components (course card, testimonial, lesson row, review).
 */

export type Course = {
  slug: string;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  level: string;
  students: string;
  price: string;
  period: string;
  thumb: string;
  lessons: number;
  duration: string;
  comments: number;
  category: string;
  /** Filter tags, drawn from the pill list in the design. */
  tags: string[];
  /** Used by the hero and learning-path cards that show progress. */
  progress?: number;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type Lesson = {
  index: number;
  title: string;
  duration: string;
  kind: "video" | "article" | "quiz";
  free?: boolean;
};

export type Review = {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  body: string;
};

export type NavLink = { label: string; href: string };

/** Shape of the /courses/[slug] content block. */
export type CourseDetail = {
  title: string;
  subtitle: string;
  author: string;
  discount: string;
  meta: readonly string[];
  previewLessons: readonly { n: string; title: string; duration: string }[];
  moreLessons: string;
  lessonCount: string;
  nudge: string;
  price: string;
  period: string;
  guarantee: string;
  includes: readonly string[];
  description: string;
  learn: readonly { lead: string; rest: string }[];
  sneakPeak: readonly string[];
  keyPoints: readonly string[];
  creator: { name: string; role: string; bio: string };
};
