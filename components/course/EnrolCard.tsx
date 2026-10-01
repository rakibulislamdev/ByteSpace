import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { courseDetail } from "@/lib/data";
import { CreatorStrip } from "./CourseHero";

/**
 * The enrol card, 412px wide, anchored to the top of the video preview so
 * it straddles the blue band rather than sitting below it.
 */
export function EnrolCard() {
  const d = courseDetail;

  return (
    <aside className="rounded-2xl bg-white p-6 shadow-e4">
      <h2 className="t-display-sm text-ink">{d.lessonCount}</h2>

      <ul className="mt-6 flex flex-col gap-4">
        {d.previewLessons.map((l) => (
          <li key={l.n} className="flex items-start gap-3">
            <span className="t-body-l w-8 shrink-0 font-medium text-ink">
              {l.n}
            </span>
            <span className="t-body-l flex-1 text-ink">{l.title}</span>
            <span className="t-body-l shrink-0 text-brand">{l.duration}</span>
          </li>
        ))}
      </ul>

      <a href="#" className="t-body-l mt-4 block text-body hover:text-brand">
        {d.moreLessons}
      </a>

      <p className="t-body-l mt-6 text-body">{d.nudge}</p>

      <p className="mt-6 flex items-baseline gap-2">
        <span className="t-display-lg text-brand">{d.price}</span>
        <span className="t-body-l text-body">{d.period}</span>
      </p>


      <Button href="#" variant="lime" size="lg" className="mt-4 w-full">
        Enroll Now
      </Button>

      <h3 className="t-display-sm mt-8 text-ink">This course include</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {d.includes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon
              name="check-circle"
              size={20}
              className="mt-0.5 shrink-0 text-brand"
            />
            <span className="t-body-l text-body">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <CreatorStrip />
      </div>
    </aside>
  );
}
