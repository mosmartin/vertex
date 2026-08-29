import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SearchInput, Select } from "@/components/ui/Input";
import { CourseCard } from "@/components/cards/CourseCard";
import { LessonCard, LessonVideoCard } from "@/components/cards/LessonCard";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { Navbar } from "@/components/navigation/Navbar";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Pagination } from "@/components/navigation/Pagination";

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-xs font-bold text-primary-500">{index}</span>
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-sm border border-neutral-100"
        style={{ backgroundColor: hex }}
      />
      <div className="text-xs">
        <div className="font-medium text-neutral-900">{name}</div>
        <div className="text-neutral-500">{hex}</div>
      </div>
    </div>
  );
}

const typeScale = [
  { style: "Display 1", font: "Playfair Display", size: "48 / 56", weight: "Bold", use: "Page titles" },
  { style: "Display 2", font: "Playfair Display", size: "36 / 44", weight: "Bold", use: "Section titles" },
  { style: "Heading 1", font: "Inter", size: "28 / 36", weight: "Semi Bold", use: "Card titles" },
  { style: "Heading 2", font: "Inter", size: "22 / 30", weight: "Semi Bold", use: "Sub section" },
  { style: "Heading 3", font: "Inter", size: "18 / 26", weight: "Medium", use: "Small titles" },
  { style: "Body Large", font: "Inter", size: "16 / 24", weight: "Regular", use: "Body copy" },
  { style: "Body", font: "Inter", size: "14 / 20", weight: "Regular", use: "Supporting text" },
  { style: "Small", font: "Inter", size: "12 / 16", weight: "Regular", use: "Captions, meta" },
];

const spacingScale = [4, 8, 12, 16, 24, 32, 40, 48, 64];
const radiusScale: { label: string; value: string }[] = [
  { label: "xs", value: "4px" },
  { label: "sm", value: "8px" },
  { label: "md", value: "12px" },
  { label: "lg", value: "16px" },
  { label: "xl", value: "24px" },
  { label: "full", value: "circle" },
];
const shadowScale: { label: string; className: string }[] = [
  { label: "Sm", className: "shadow-sm" },
  { label: "Md", className: "shadow-md" },
  { label: "Lg", className: "shadow-lg" },
  { label: "Xl", className: "shadow-xl" },
];

const iconNames: IconName[] = [
  "bell",
  "search",
  "play",
  "file",
  "bookmark",
  "bar-chart",
  "clock",
  "user",
  "chevron-right",
];

const principles: { icon: IconName; title: string; description: string }[] = [
  { icon: "eye", title: "Clarity First", description: "Every element should communicate clearly." },
  { icon: "grid", title: "Consistency", description: "Use components and patterns consistently across the platform." },
  { icon: "target", title: "Focus & Calm", description: "Remove noise and help learners focus on what matters." },
  { icon: "accessibility", title: "Accessible", description: "Design with accessibility and inclusion in mind." },
];

export const metadata = {
  title: "Design System · Vertex",
};

export default function DesignSystemPage() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50">
      <Navbar />

      <header className="border-b border-neutral-200 bg-white px-6 py-16">
        <div className="mx-auto flex max-w-6xl items-center gap-2 text-primary-500">
          <span className="flex h-9 w-9 items-center justify-center rounded-xs bg-primary-500 text-white">
            <Icon name="logo-mark" size={20} filled />
          </span>
          <span className="font-display text-xl font-bold text-neutral-900">Vertex</span>
        </div>
        <div className="mx-auto mt-6 max-w-6xl">
          <h1 className="font-display text-5xl font-bold leading-tight text-neutral-900">
            Design System
          </h1>
          <p className="mt-4 max-w-xl text-base text-neutral-500">
            A unified design language for Vertex learning platform. Clean, modern and
            focused on clarity, consistency and intuitive learning experiences.
          </p>
          <p className="mt-6 text-xs font-medium uppercase tracking-wider text-neutral-500">
            Version 1.0 · Aug 2026
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
        {/* 01 Colors */}
        <Section index="01" title="Colors">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">Primary</h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                <Swatch name="Primary 500" hex="#F97316" />
                <Swatch name="Primary 400" hex="#FB923C" />
                <Swatch name="Primary 300" hex="#FDBA74" />
                <Swatch name="Primary 200" hex="#FED7AA" />
                <Swatch name="Primary 100" hex="#FFEEE5" />
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">Neutral</h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                <Swatch name="Neutral 900" hex="#0F172A" />
                <Swatch name="Neutral 700" hex="#334155" />
                <Swatch name="Neutral 500" hex="#64748B" />
                <Swatch name="Neutral 300" hex="#CBD5E1" />
                <Swatch name="Neutral 200" hex="#E2E8F0" />
                <Swatch name="Neutral 100" hex="#F1F5F9" />
                <Swatch name="Neutral 50" hex="#FAFAFC" />
                <Swatch name="White" hex="#FFFFFF" />
              </div>
            </div>
          </div>
        </Section>

        {/* 02 + 03 Typography / Type scale */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section index="02" title="Typography">
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-display text-4xl font-bold text-neutral-900">Ag</div>
                <p className="mt-1 text-sm text-neutral-500">
                  Playfair Display &middot; Elegant &middot; Readable &middot; Timeless
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-neutral-900">Ag</div>
                <p className="mt-1 text-sm text-neutral-500">
                  Inter &middot; Clean &middot; Modern &middot; Highly legible
                </p>
              </div>
            </div>
          </Section>

          <Section index="03" title="Type Scale">
            <div className="overflow-x-auto">
              <table className="w-full min-w-105 text-left text-sm">
                <thead>
                  <tr className="text-xs text-neutral-500">
                    <th className="pb-2 font-medium whitespace-nowrap">Style</th>
                    <th className="pb-2 font-medium whitespace-nowrap">Size / LH</th>
                    <th className="pb-2 font-medium whitespace-nowrap">Weight</th>
                    <th className="pb-2 font-medium whitespace-nowrap">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {typeScale.map((row) => (
                    <tr key={row.style} className="border-t border-neutral-100">
                      <td className="py-2 font-medium whitespace-nowrap text-neutral-900">{row.style}</td>
                      <td className="py-2 whitespace-nowrap text-neutral-500">{row.size}</td>
                      <td className="py-2 whitespace-nowrap text-neutral-500">{row.weight}</td>
                      <td className="py-2 whitespace-nowrap text-neutral-500">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {/* 04 + 05 Spacing / Radius & Shadows */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section index="04" title="Spacing System">
            <p className="mb-4 text-xs text-neutral-500">Base unit: 4px</p>
            <div className="flex items-end gap-3">
              {spacingScale.map((px) => (
                <div key={px} className="flex flex-col items-center gap-2">
                  <div
                    className="w-4 rounded-xs bg-primary-200"
                    style={{ height: px }}
                  />
                  <span className="text-[10px] text-neutral-500">{px}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section index="05" title="Radius &amp; Shadows">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-neutral-900">Radius</h3>
                <div className="flex gap-3">
                  {radiusScale.map((r) => (
                    <div key={r.label} className="flex flex-col items-center gap-1.5">
                      <div
                        className="h-10 w-10 border border-neutral-200 bg-neutral-50"
                        style={{ borderRadius: r.value === "circle" ? "9999px" : r.value }}
                      />
                      <span className="text-[10px] text-neutral-500">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-neutral-900">Shadows</h3>
                <div className="flex gap-3">
                  {shadowScale.map((s) => (
                    <div
                      key={s.label}
                      className={`flex h-14 w-16 items-center justify-center rounded-sm bg-white text-xs font-medium text-neutral-700 ${s.className}`}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 06 Icons */}
        <Section index="06" title="Icons">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">Outline Style</h3>
              <div className="flex flex-wrap gap-4 text-neutral-700">
                {iconNames.map((name) => (
                  <Icon key={name} name={name} size={20} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">Filled Style</h3>
              <div className="flex flex-wrap gap-4 text-neutral-700">
                {iconNames.map((name) => (
                  <Icon key={name} name={name} size={20} filled />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            24&times;24px grid &middot; 2px stroke (outline) &middot; Rounded line caps &middot; Consistent optical balance
          </p>
        </Section>

        {/* 07 Buttons */}
        <Section index="07" title="Buttons">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">Explore Courses</Button>
            <Button variant="tertiary" icon="external-link">
              View Lesson
            </Button>
            <Button variant="text" icon="play" iconPosition="leading">
              Watch Video
            </Button>

            <Button variant="primary" className="bg-primary-400">
              Get Started
            </Button>
            <Button variant="secondary" className="bg-primary-100">
              Explore Courses
            </Button>
            <Button variant="tertiary" icon="external-link" className="bg-primary-100">
              View Lesson
            </Button>
            <Button variant="text" icon="play" iconPosition="leading" className="text-primary-400">
              Watch Video
            </Button>

            <Button variant="primary" disabled>
              Get Started
            </Button>
            <Button variant="secondary" disabled>
              Explore Courses
            </Button>
            <Button variant="tertiary" icon="external-link" disabled>
              View Lesson
            </Button>
            <Button variant="text" icon="play" iconPosition="leading" disabled>
              Watch Video
            </Button>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Height: 44px (default) &middot; Radius: 12px &middot; Font: Inter Medium (14&ndash;16px)
          </p>
        </Section>

        {/* 08 Inputs */}
        <Section index="08" title="Inputs">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-neutral-900">Search / Text Input</h3>
              <SearchInput placeholder="Search anything..." />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-neutral-900">Select</h3>
              <Select options={["Most Relevant", "Newest", "Oldest"]} />
            </div>
          </div>
        </Section>

        {/* 09, 10, 11 Badges / Status / Progress */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Section index="09" title="Badges / Tags">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Badge variant="video">Video</Badge>
                <span className="text-xs text-neutral-500">Video</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="lesson">Lesson</Badge>
                <span className="text-xs text-neutral-500">Lesson</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="popular">Popular</Badge>
                <span className="text-xs text-neutral-500">Popular</span>
              </div>
            </div>
          </Section>

          <Section index="10" title="Status / Indicators">
            <div className="flex flex-col gap-3">
              <StatusIndicator status="in-progress" />
              <StatusIndicator status="completed" />
              <StatusIndicator status="now-playing" />
              <StatusIndicator status="locked" />
            </div>
          </Section>

          <Section index="11" title="Progress Bar">
            <ProgressBar value={35} />
          </Section>
        </div>

        {/* 12 Cards */}
        <Section index="12" title="Cards">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-500">Course Card</p>
              <CourseCard
                initial="N"
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                modules="12 modules"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-500">Lesson Card (Video)</p>
              <LessonVideoCard
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                meta="Lesson 5.1 · 12:45"
                cta="Watch from 12:45"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-500">Lesson Card (Lesson)</p>
              <LessonCard
                title="Data Fetching &amp; Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                meta="Module 5"
                cta="View lesson"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-neutral-500">Resource Card</p>
              <ResourceCard
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                meta="PDF · 1.2 MB"
              />
            </div>
          </div>
        </Section>

        {/* 13 Navigation */}
        <Section index="13" title="Navigation">
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-md border border-neutral-200">
              <Navbar />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Breadcrumbs items={["All Courses", "Next.js for Production", "Data Fetching & Caching"]} />
              <Pagination current={1} total={8} />
            </div>
          </div>
        </Section>

        {/* 14 Principles */}
        <Section index="14" title="Principles">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.title} className="flex flex-col gap-2">
                <Icon name={p.icon} size={20} className="text-neutral-700" />
                <h3 className="text-sm font-semibold text-neutral-900">{p.title}</h3>
                <p className="text-xs text-neutral-500">{p.description}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
