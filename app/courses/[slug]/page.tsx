import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseLayout } from "@/components/course/CourseLayout";
import { courses } from "@/lib/data";

export const metadata: Metadata = { title: "Course" };

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!courses.some((c) => c.slug === slug)) notFound();

  return <CourseLayout slug={slug} />;
}
