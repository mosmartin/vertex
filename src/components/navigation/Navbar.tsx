import { Icon } from "@/components/ui/Icon";

export function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xs bg-primary-500 text-white">
          <Icon name="logo-mark" size={16} filled />
        </span>
        <span className="font-display text-lg font-bold text-neutral-900">Vertex</span>
      </div>
      <div className="flex items-center gap-4 text-sm font-medium text-neutral-700 sm:gap-6">
        <a href="#" className="text-neutral-900">
          Courses
        </a>
        <a href="#" className="hover:text-neutral-900">
          My Learning
        </a>
      </div>
    </nav>
  );
}
