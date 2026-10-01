import { Icon } from "@/components/ui/icons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { courseLessons } from "@/lib/data";

/**
 * Body of the Lessons tab: the module list, then the two supporting
 * sections and the progress readout.
 */
export function LessonsBody() {
  const d = courseLessons;

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="t-display-sm text-ink">{d.modulesIntro}</h2>
        <p className="t-body-l mt-4 text-body">{d.modulesIntroBody}</p>
      </section>

      <section>
        <h2 className="t-display-sm text-ink">{d.listHeading}</h2>
        <ul className="mt-6 flex flex-col gap-4">
          {d.modules.map((m) => (
            <li key={m.title}>
              <a
                href="#"
                className="press flex items-start gap-4 rounded-md border border-line bg-white p-5 transition-colors duration-200 hover:border-ink"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lime">
                  <Icon name="play-circle" size={20} className="text-ink" />
                </span>
                <span className="min-w-0">
                  <span className="t-h-s block text-ink">{m.title}</span>
                  <span className="t-body-m mt-1 block text-body">{m.body}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="t-display-sm text-ink">{d.contentHeading}</h2>
        <p className="t-body-l mt-4 text-body">{d.contentBody}</p>
      </section>

      <section>
        <h2 className="t-display-sm text-ink">{d.progressHeading}</h2>
        <p className="t-body-l mt-4 text-body">{d.progressBody}</p>
      </section>

      <section>
        <p className="t-label-lg text-ink">{d.progressLabel}</p>
        <p className="t-display-lg mt-3 text-ink">{d.progressValue}%</p>
        <ProgressBar value={d.progressValue} className="mt-4 max-w-[420px]" />
      </section>
    </div>
  );
}
