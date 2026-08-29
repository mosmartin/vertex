import { Icon } from "@/components/ui/Icon";

export function Navbar() {
  return (
    <nav className="border-b border-neutral-200 bg-white px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-360 flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
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
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
          >
            <Icon name="bell" size={18} />
          </button>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
            <Icon name="user" size={16} filled />
          </span>
        </div>
      </div>
    </nav>
  );
}
