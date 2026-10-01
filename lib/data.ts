import type { Course, Lesson, NavLink, Review, Testimonial } from "./types";

/**
 * All copy and content is transcribed from the Figma file's TEXT nodes so
 * the replica keeps the source design's exact wording.
 */

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Creators", href: "/creator" },
];

export const headerLinks: NavLink[] = [
  { label: "Sign In", href: "/login" },
  { label: "Join Us", href: "/register" },
];

/**
 * Category filter pills under the "Discover Your Passion" heading.
 *
 * The design lays these out as three fixed, independently centred rows
 * (1086px, 952px and 622px wide in a 1440 frame) rather than as one
 * wrapping list, so the grouping is part of the design and lives here
 * rather than being left to flex-wrap.
 */
export const categoryFilterRows = [
  [
    "Featured",
    "Music",
    "Drawing & Painting",
    "Marketing",
    "Animation",
    "Social Media",
    "UI/UX Design",
    "Creative Marketing",
  ],
  [
    "Digital Illustration",
    "Film & Video",
    "Crafts",
    "Freelance & Entrepreneurship",
    "Graphic Design",
    "Photography",
  ],
  ["Productivity", "Web Development", "Data Science", "Cooking"],
] as const;

/** Flat view of the rows above, for consumers that just need the labels. */
export const categoryFilters: readonly string[] = categoryFilterRows.flat();

export const featuredCategories = [
  { label: "Design", icon: "shapes" },
  { label: "Development", icon: "code" },
  { label: "IT & Software", icon: "monitor" },
  { label: "Business", icon: "briefcase" },
  { label: "Marketing", icon: "campaign" },
  { label: "Photography", icon: "camera" },
] as const;

/**
 * The six category tiles. Icon names match the generated
 * components/ui/CategoryIcons.tsx, which holds the real glyph vectors
 * lifted from these cards in the Figma frame.
 */
export const learningPaths = [
  { label: "Design", icon: "design" },
  { label: "Development", icon: "development" },
  { label: "IT & Software", icon: "itSoftware" },
  { label: "Business", icon: "business" },
  { label: "Marketing", icon: "marketing" },
  { label: "Photography", icon: "photography" },
] as const;

const SHARED_META = { lessons: 17, duration: "2 hours 16 mins", comments: 59 };

export const courses: Course[] = [
  {
    ...SHARED_META,
    slug: "learn-figma-from-basic",
    tags: ["UI/UX Design", "Graphic Design", "Drawing & Painting", "Digital Illustration", "Featured"],
    title: "Learn Figma from Basic",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-1.png",
    category: "Design",
  },
  {
    ...SHARED_META,
    slug: "build-digital-asset",
    tags: ["Web Development", "Data Science", "Featured", "Crafts"],
    title: "Build Digital Asset",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-2.png",
    category: "Development",
  },
  {
    ...SHARED_META,
    slug: "the-power-of-big-data",
    tags: ["Data Science", "Freelance & Entrepreneurship", "Featured"],
    title: "the Power of Big Data",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-3.png",
    category: "Business",
  },
  {
    ...SHARED_META,
    slug: "balancing-productivity-and-self-care",
    tags: ["Productivity", "Social Media", "Featured"],
    title: "Balancing Productivity and Self-Care",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-4.png",
    category: "Photography",
  },
  {
    ...SHARED_META,
    slug: "mastering-money-management",
    tags: ["Freelance & Entrepreneurship", "Productivity", "Featured"],
    title: "Mastering Money Management",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-5.png",
    category: "IT & Software",
  },
  {
    ...SHARED_META,
    slug: "from-idea-to-startup-success",
    tags: ["Marketing", "Social Media", "Featured", "Creative Marketing"],
    title: "From Idea to Startup Success",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-6.png",
    category: "Marketing",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content have been game-changing for me. The platform truly fosters a sense of community and lifelong learning.",
    avatar: "/assets/avatar-11.png",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
    avatar: "/assets/avatar-12.png",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
    avatar: "/assets/avatar-13.png",
  },
];

export const creatorBenefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

export const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

export const footerColumns = [
  {
    heading: "Browse",
    links: [
      "Featured Courses",
      "Featured Categories",
      "Business",
      "IT",
      "Design",
    ],
  },
  {
    heading: "Development",
    links: [
      "Development",
      "Marketing",
      "Photography",
      "Finance",
      "Sport",
    ],
  },
  {
    heading: "Platform",
    links: [
      "Become a Creator",
      "Affiliate Program",
      "Contact",
      "Help",
      "About",
    ],
  },
];

export const legalLinks = ["Privacy Policy", "Terms of Service", "Cookies Settings"];

export const lessons: Lesson[] = [
  { index: 1, title: "Getting Started with Figma", duration: "6 mins", kind: "video", free: true },
  { index: 2, title: "Understanding the Canvas", duration: "9 mins", kind: "video" },
  { index: 3, title: "Frames, Groups and Components", duration: "12 mins", kind: "video" },
  { index: 4, title: "Auto Layout in Practice", duration: "14 mins", kind: "video" },
  { index: 5, title: "Typography and Type Styles", duration: "8 mins", kind: "article" },
  { index: 6, title: "Working with Colour Styles", duration: "11 mins", kind: "video" },
  { index: 7, title: "Prototype Connections", duration: "10 mins", kind: "video" },
  { index: 8, title: "Design Systems from Scratch", duration: "16 mins", kind: "video" },
  { index: 9, title: "Quiz: Layout Fundamentals", duration: "5 mins", kind: "quiz" },
];

export const reviews: Review[] = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/assets/avatar-11.png",
    rating: 5,
    date: "March 12, 2023",
    body: "The course provided me with a comprehensive understanding of the fundamentals. The lessons are well paced and the examples are practical.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "/assets/avatar-12.png",
    rating: 4,
    date: "February 28, 2023",
    body: "Great course overall. I would have liked a little more on advanced patterns, but the core material is solid and clear.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "/assets/avatar-13.png",
    rating: 5,
    date: "January 19, 2023",
    body: "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the community is incredibly supportive.",
  },
];

/* ==========================================================================
   Course detail
   Content for /courses/[slug]. Transcribed from the "Course Details" frame.
   ========================================================================== */

export const courseDetail = {
  title: "Build Digital Asset: A Comprehensive Guide",
  subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
  author: "purepearl studio",
  discount: "20% OFF",
  /** Pills under the author line, on the blue band. */
  meta: ["Intermediate", "4.8 (172 reviews)", "199 Students"],

  /** First three lessons previewed in the sidebar. */
  previewLessons: [
    { n: "01", title: "Introduction to Digital Assets", duration: "12 mins" },
    { n: "02", title: "Design Principles for Impacts", duration: "21 mins" },
    { n: "03", title: "Advanced Techniques in Digital Creation", duration: "16 mins" },
  ],
  moreLessons: "99 more videos",
  lessonCount: "112 Lessons (24 hours)",

  nudge: "Ready to Dive In? Enroll Now and Start Building Your Digital Future!",
  price: "$25",
  period: "/lifetime",
  guarantee: "30-Day Money-Back Guarantee",

  includes: [
    "Learning Resources",
    "Quality Lesson Videos",
    "Certificate of Completion",
    "Private Consultation",
  ],

  description:
    "Embark on an enlightening exploration into the world of digital creation with our comprehensive course. Whether you're a seasoned professional or a curious beginner, this course is designed to cater to all levels of expertise.",

  /** Bold-led points under "What you'll learn". */
  learn: [
    {
      lead: "Build a Brand Identity",
      rest: "Create logos and define your visual language from scratch.",
    },
    {
      lead: "Master Colour and Type",
      rest: "Apply proven systems so every piece reads as one brand.",
    },
    {
      lead: "Design for Every Platform",
      rest: "Adapt a single idea across web, mobile and print.",
    },
    {
      lead: "Package Your Work",
      rest: "Assemble a portfolio that gets you hired or sold.",
    },
  ],

  sneakPeak: [
    "/assets/thumb-small-1.png",
    "/assets/thumb-small-2.png",
    "/assets/thumb-small-3.png",
    "/assets/thumb-small-4.png",
  ],

  keyPoints: [
    "Foundational Concepts",
    "Design Principles Mastery",
    "Advanced Techniques in Digital Creation",
    "Project Showcase and Critique",
    "Optimizing for Various Platforms",
    "Digital Asset Management Best Practices",
    "Monetization Strategies",
    "Capstone Project: Building Your Portfolio",
  ],

  creator: {
    name: "PurePearl Studio",
    role: "Professional Creator",
    bio: "At ByteSpace, we believe in empowering individuals and organisations through knowledge.",
  },
};

/* ==========================================================================
   Course lessons and reviews
   Transcribed from the "Course Lessons" and "Course Reviews" frames. The
   module list skips 3 exactly as the design does.
   ========================================================================== */

export const courseLessons = {
  modulesIntro: "Explore the Modules",
  modulesIntroBody:
    "Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and tools to elevate your skills.",
  listHeading: "Lesson List",
  modules: [
    {
      title: "Module 1: Introduction to Digital Assets",
      body: "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Build a strong foundation for your creative journey.",
    },
    {
      title: "Module 2: Design Principles for Impact",
      body: "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Fundamentals.'",
    },
    {
      title: "Module 4: User-Centric Design Strategies",
      body: "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital experiences that resonate with your audience.",
    },
    {
      title: "Module 5: Interactive Media and Engagement",
      body: "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.'",
    },
    {
      title: "Module 6: Project Showcase and Critique",
      body: "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Review and Feedback.'",
    },
    {
      title: "Module 7: Optimizing Digital Assets for Various Platforms",
      body: "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and impact across the digital landscape.",
    },
  ],
  contentHeading: "Lesson Content",
  contentBody:
    "Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements that bring the material to life.",
  progressHeading: "Lesson Progress Tracking",
  progressBody:
    "Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey step by step.",
  progressLabel: "Learning Progress",
  progressValue: 55,
};

export const courseReviews = {
  heading: "What Learners Are Saying",
  body:
    "Discover what our learners have to say about their experience with 'Build Digital Assets: A Comprehensive Guide.' Read genuine feedback and perspectives from individuals who have embarked on this learning journey.",
  average: "4.7",
  averageLabel: "Ratings",
  /** Star value against the number of ratings at that level. */
  breakdown: [
    { stars: 5, count: "720" },
    { stars: 4, count: "120" },
    { stars: 3, count: "21" },
    { stars: 2, count: "12" },
    { stars: 1, count: "16" },
  ],
  listHeading: "Individual Reviews:",
  filters: ["All rating", "5", "4", "3", "2", "1"],
  items: [
    {
      name: "PurePearl Studio",
      role: "UI/UX Designer",
      when: "a year ago",
      stars: 5,
      body: "The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
    },
    {
      name: "Albert Flores",
      role: "UI/UX Designer",
      when: "a year ago",
      stars: 5,
      body: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
    },
    {
      name: "Cody Fisher",
      role: "UI/UX Designer",
      when: "a year ago",
      stars: 4,
      body: "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
    },
    {
      name: "Brooklyn Simmons",
      role: "UI/UX Designer",
      when: "a year ago",
      stars: 4,
      body: "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
    },
  ],
};
