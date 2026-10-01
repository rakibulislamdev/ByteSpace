import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";

/**
 * The white search pill with its lime submit button.
 *
 * Identical on the home hero and the courses page, and the design gives
 * both the same 52px height, so it lives in one place. `autoFocus` is
 * deliberately absent: stealing focus on load is hostile on mobile.
 */
export function SearchField({
  id,
  className = "",
  defaultValue = "",
}: {
  id: string;
  className?: string;
  defaultValue?: string;
}) {
  return (
    <form
      className={`flex w-full flex-col gap-2.5 sm:flex-row sm:gap-3 ${className}`}
      action="/courses"
      role="search"
    >
      <label htmlFor={id} className="sr-only">
        Search courses
      </label>
      <div className="relative flex-1">
        <Icon
          name="search"
          size={18}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-subtle"
        />
        <input
          id={id}
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder="Course, topic, creator"
          className="t-body-l placeholder:text-subtle h-[46px] w-full rounded-full bg-white pr-4 pl-10 text-ink transition-[box-shadow] duration-200 focus:ring-2 focus:ring-lime focus:outline-none sm:h-[52px] sm:pl-11"
        />
      </div>
      <Button type="submit" variant="lime" size="lg" className="flex items-center justify-center gap-2 px-8">
        Courses
        <Icon name="chevron-down" size={18} className="text-ink" />
      </Button>
    </form>
  );
}
