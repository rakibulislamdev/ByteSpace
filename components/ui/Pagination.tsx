import { Icon } from "@/components/ui/icons";

/**
 * Numbered pagination: circular arrow buttons either side of the page
 * list, matching the 56px controls in the design.
 *
 * Presentational on purpose - the listing pages are static, so the
 * buttons carry the right roles and labels but do not drive state.
 */
export function Pagination({
  page = 1,
  pages = [1, 2, 3, 4, 5],
  className = "",
  onPageChange,
}: {
  page?: number;
  pages?: number[];
  className?: string;
  onPageChange?: (page: number) => void;
}) {
  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => onPageChange?.(Math.max(1, page - 1))}
            disabled={page === 1}
            className="press grid size-14 place-items-center rounded-full bg-white text-ink transition-colors duration-200 hover:bg-surface disabled:opacity-50 disabled:pointer-events-none"
          >
            <Icon name="chevron-left" size={20} />
          </button>
        </li>
        {pages.map((p) => {
          const active = p === page;
          return (
            <li key={p}>
              <button
                type="button"
                aria-label={`Page ${p}`}
                aria-current={active ? "page" : undefined}
                onClick={() => onPageChange?.(p)}
                className={[
                  "press t-body-l grid h-14 w-9 place-items-center rounded-full",
                  active ? "bg-brand text-white" : "text-ink hover:bg-surface",
                ].join(" ")}
              >
                {p}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => onPageChange?.(Math.min(pages[pages.length - 1] || 1, page + 1))}
            disabled={page === (pages[pages.length - 1] || 1)}
            className="press grid size-14 place-items-center rounded-full bg-white text-ink transition-colors duration-200 hover:bg-surface disabled:opacity-50 disabled:pointer-events-none"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
