import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/icons";

/** Default faces for the social-proof stack. */
const DEFAULT_PEOPLE = [
  "/assets/avatar-05.png",
  "/assets/avatar-06.png",
  "/assets/avatar-07.png",
  "/assets/avatar-08.png",
  "/assets/avatar-09.png",
];

/**
 * Floating social-proof card: a rating and an overlapping avatar stack
 * capped with a total. Shared by the hero and the creator band, which
 * previously each had their own copy of this markup.
 */
export function HappyStudentsCard({
  label = "Happy Students",
  rating = 4.5,
  reviewCount = 240,
  total = "2K+",
  people = DEFAULT_PEOPLE,
  className = "",
}: {
  label?: string;
  rating?: number;
  reviewCount?: number;
  /** Trailing chip, e.g. "2K+". Omit to hide it. */
  total?: string;
  people?: string[];
  className?: string;
}) {
  return (
    <div className={`w-full rounded-lg bg-white p-4 shadow-e4 md:w-[258px] ${className}`}>
      <p className="t-h-s text-ink">{label}</p>
      <p className="t-body-s mt-1 flex items-center gap-1 text-subtle">
        {rating.toFixed(1)} ({reviewCount})
        <Icon name="star-lime" size={12} />
      </p>
      <div className="mt-3 flex items-center">
        {people.map((src, i) => (
          <Avatar
            key={src}
            src={src}
            size={32}
            alt=""
            className="ring-2 ring-white"
            // -8px overlap, matching the Figma auto-layout gap of -8
            {...{ style: { marginLeft: i === 0 ? 0 : -8 } }}
          />
        ))}
        {total ? (
          <span className="t-label ml-2 grid size-8 shrink-0 place-items-center rounded-full bg-lime text-ink">
            {total}
          </span>
        ) : null}
      </div>
    </div>
  );
}
