import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-neutral-50 px-6 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary-500 text-white">
        <Icon name="logo-mark" size={22} filled />
      </span>
      <h1 className="font-display text-3xl font-bold text-neutral-900">Vertex</h1>
      <p className="max-w-md text-sm text-neutral-500">
        A unified design language for the Vertex learning platform.
      </p>
      <Link
        href="/design-system"
        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md bg-primary-500 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-400"
      >
        View Design System
        <Icon name="chevron-right" size={16} />
      </Link>
    </div>
  );
}
