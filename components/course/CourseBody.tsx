import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { courseDetail } from "@/lib/data";

/**
 * The body below the band: description, what you'll learn, a sneak-peak
 * strip and the key-points list. Single 725px column in the design,
 * with the enrol card running alongside.
 */
export function CourseBody() {
  const d = courseDetail;

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="t-display-sm text-ink">Description</h2>
        <p className="t-body-l mt-4 text-body">{d.description}</p>
      </section>

      <section>
        <h2 className="t-display-sm text-ink">What you&rsquo;ll learn:</h2>
        <ul className="mt-5 flex flex-col gap-4">
          {d.learn.map((item) => (
            <li key={item.lead} className="flex items-start gap-3">
              <Icon
                name="check-circle"
                size={20}
                className="mt-1 shrink-0 text-brand"
              />
              <p className="t-body-l text-body">
                <strong className="font-medium text-ink">{item.lead}:</strong>{" "}
                {item.rest}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="t-display-sm text-ink">Sneak Peak</h2>
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {d.sneakPeak.map((src) => (
            <li
              key={src}
              className="relative aspect-[167/125] overflow-hidden rounded-sm"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 180px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="t-display-sm text-ink">Key Points</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {d.keyPoints.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Icon
                name="check-circle"
                size={20}
                className="mt-0.5 shrink-0 text-brand"
              />
              <span className="t-body-l text-body">{point}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
