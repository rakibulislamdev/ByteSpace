import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * The brand-blue page banner used by Search, Course, Creator and 404.
 * Short pages (592px) omit the sub-copy slot.
 */
export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-brand text-on-dark">
      <SiteHeader />
      <div className="mx-auto max-w-[1200px] px-5 pt-8 pb-16 md:px-0 md:pb-20">
        <h1 className="t-display-lg max-w-[820px] text-on-dark">{title}</h1>
        {subtitle ? (
          <p className="t-body-l mt-5 max-w-[700px] text-on-dark-muted">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
