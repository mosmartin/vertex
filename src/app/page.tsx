import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/Input";
import { CourseCard } from "@/components/cards/CourseCard";
import { Navbar } from "@/components/navigation/Navbar";

const courses = [
  {
    initial: "N",
    iconClassName: "bg-neutral-900 text-white",
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
  },
  {
    initial: "D",
    icon: (
      <span role="img" aria-label="Docker" className="text-2xl leading-none">
        🐳
      </span>
    ),
    iconClassName: "bg-info-100 text-info-500",
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
  },
  {
    initial: "TS",
    iconClassName: "bg-info-500 text-white",
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
  },
];

const barHeights = [28, 44, 34, 60, 40, 72, 50, 88, 60, 40, 76, 52, 32, 64, 44, 30];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-neutral-200 px-6 pt-20 pb-16 text-center">
        <div className="mx-auto w-full max-w-360">
          <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-500">
            Intelligent Learning
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl md:text-6xl">
            Search your learning in plain English.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-neutral-500">
            Vertex understands what you want to learn and finds the exact lessons across
            all your courses.
          </p>

          <div className="mt-8 flex justify-center">
            <Button variant="primary" icon="chevron-right">
              Explore Courses
            </Button>
          </div>

          <div className="mx-auto mt-6 max-w-xl">
            <SearchInput placeholder="Ask anything about your learning..." className="bg-white" />
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-360">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
              All Courses
            </h2>
            <Link
              href="#"
              className="flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-400"
            >
              View all courses
              <Icon name="chevron-right" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider strip */}
      <div className="px-6">
        <div className="mx-auto flex w-full max-w-360 items-center gap-4 text-sm text-neutral-500">
          <span className="h-px flex-1 bg-neutral-200" />
          <span className="flex shrink-0 items-center gap-2">
            <Icon name="star" size={16} className="text-primary-500" />
            New courses and lessons added every week.
          </span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>
      </div>

      {/* Decorative graphic */}
      <div className="px-6">
        <div
          aria-hidden="true"
          className="mx-auto mt-12 flex h-40 w-full max-w-360 items-end justify-center gap-2 overflow-hidden sm:gap-3"
        >
          {barHeights.map((height, index) => (
            <span
              key={index}
              className="w-6 shrink-0 rounded-t-md sm:w-9"
              style={{
                height,
                background:
                  "linear-gradient(to top, transparent, var(--color-primary-300) 40%, var(--color-primary-400))",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
