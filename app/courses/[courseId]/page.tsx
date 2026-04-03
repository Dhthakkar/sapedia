import type { Metadata } from "next";
import COURSE_REGISTRY from "@/data/registry";
import CourseClient from "./CourseClient";

type Props = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  const course = COURSE_REGISTRY[courseId];
  if (!course) return {};

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} | SAPedia`,
      description: course.description,
      url: `https://sapedia.vercel.app/courses/${courseId}`,
      images: [
        {
          url: "https://sapedia.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
  };
}

export default function Page({ params }: Props) {
  return <CourseClient paramsPromise={params} />;
}
