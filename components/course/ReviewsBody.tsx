import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/icons";
import { courseReviews } from "@/lib/data";

/**
 * Body of the Reviews tab: the rating summary with its distribution
 * bars, a filter row, and the individual reviews.
 */
export function ReviewsBody() {
  const d = courseReviews;
  const max = Math.max(...d.breakdown.map((b) => Number(b.count)));

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="t-display-sm text-ink">{d.heading}</h2>
        <p className="t-body-l mt-4 text-body">{d.body}</p>

        {/* Summary: white card, radius 16, holding a lime block on the
            left and the star distribution beside it. */}
        <div className="mt-8 flex flex-col gap-6 rounded-md border border-line bg-white p-6 sm:flex-row sm:gap-6 sm:p-10">
          <div className="shrink-0 self-start rounded-xs bg-lime px-10 py-8 text-center">
            <p className="t-label-lg text-ink">{d.averageLabel}</p>
            <p className="t-display-md mt-1 text-ink">{d.average}</p>
          </div>

          <ul className="flex-1">
            {d.breakdown.map((row) => (
              <li key={row.stars} className="flex items-center gap-4 py-1">
                <span className="t-body-l w-4 shrink-0 text-center text-body">
                  {row.stars}
                </span>
                <span className="grid size-6 shrink-0 place-items-center">
                  <Icon name="star-lime" size={20} className="text-lime" />
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                  <span
                    className="block h-full rounded-full bg-lime"
                    style={{ width: `${(Number(row.count) / max) * 100}%` }}
                  />
                </span>
                <span className="t-body-l w-12 shrink-0 text-right text-body">
                  {row.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="t-display-sm text-ink">{d.listHeading}</h2>

        {/* Same pill language as the course tabs: lime for the active
            filter, surface grey for the rest, each star rating carrying
            its own glyph. */}
        <ul className="mt-5 flex flex-wrap gap-3">
          {d.filters.map((f, i) => {
            const active = i === 0;
            return (
              <li key={f}>
                <span
                  className={[
                    "t-body-l flex h-12 items-center gap-2 rounded-full px-4 font-medium",
                    active
                      ? "bg-lime text-ink"
                      : "bg-surface text-body",
                  ].join(" ")}
                >
                  {active ? null : (
                    <Icon name="star-lime" size={18} className="text-body" />
                  )}
                  {f}
                </span>
              </li>
            );
          })}
        </ul>

        <ul className="mt-8 flex flex-col gap-4">
          {d.items.map((r) => (
            <li
              key={r.name}
              className="rounded-lg border border-line bg-white p-6 md:p-10"
            >
              <div className="flex items-center gap-4">
                <Avatar src="/assets/avatar-11.png" size={43} alt={r.name} />
                <div className="min-w-0 flex-1">
                  <p className="t-h-s text-ink">{r.name}</p>
                  <p className="t-body-s text-body">{r.role}</p>
                </div>
                <time className="t-body-s shrink-0 text-body">{r.when}</time>
              </div>
              <StarRow value={r.stars} className="mt-4" />
              <p className="t-body-m mt-3 text-body">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StarRow({ value, className = "" }: { value: number; className?: string }) {
  return (
    <ul className={`flex gap-1 ${className}`} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i}>
          <Icon
            name="star-lime"
            size={16}
            className={i < Math.round(value) ? "text-lime" : "text-line"}
          />
        </li>
      ))}
    </ul>
  );
}
