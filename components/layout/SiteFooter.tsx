import Link from "next/link";
import { footerColumns, legalLinks } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

/**
 * Site footer: 1440x525 white band, hairline top border, 1200px content.
 * Left column is the wordmark + newsletter form; right is three link
 * columns. Copyright row sits below a full-width hairline.
 */
export function SiteFooter() {
  return (
    <footer className="w-full border-t border-line bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-0 md:py-[71px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[92px]">
          {/* Brand + newsletter */}
          <div className="flex max-w-[528px] flex-col gap-6 lg:w-[528px]">
            <Logo tone="dark" />
            <p className="t-body-m text-body">
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row" action="#">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="t-body-l text-ink placeholder:text-subtle h-[46px] w-full rounded-full sm:h-[52px] border border-line bg-white px-6 transition-colors duration-200 focus:border-ink focus:outline-none sm:flex-1"
              />
              <Button type="submit" variant="lime" size="lg">
                Search
              </Button>
            </form>
            <p className="t-body-s text-subtle">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="t-body-l mb-6 font-medium">{col.heading}</h3>
                {/* py-2 on touch lifts the hit area to ~40px; the tighter
                    gap keeps the visual rhythm the design specifies. */}
                <ul className="flex flex-col gap-2 md:gap-4">
                  {col.links.map((label) => (
                    <li key={label}>
                      <Link
                        href="#"
                        className="t-body-m block py-2 text-body transition-colors duration-200 hover:text-brand md:py-0"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 border-t border-line pt-6 md:mt-[38px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="t-body-s text-ink">
              @ 2023 ByteSpace. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="t-body-s block py-2 text-body transition-colors duration-200 hover:text-brand sm:py-0"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
