"use client";

import { MobileNav } from "@/components/layout/MobileNav";
import { Icon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { headerLinks, nav } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const onDark = tone === "light";
  const pathname = usePathname();

  return (
    <header
      className={["w-full", onDark ? "text-on-dark" : "text-ink"].join(" ")}
    >
      <div className="mx-auto flex h-[88px] max-w-[1200px] items-center justify-between gap-8 px-5 md:h-[120px] md:px-0">
        <Logo tone={onDark ? "light" : "dark"} />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "t-body-l transition-colors duration-200",
                      isActive ? (onDark ? "text-lime font-medium" : "text-brand font-medium") : "",
                      onDark ? "hover:text-lime" : "hover:text-brand",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {headerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "t-body-l transition-colors duration-200",
                    onDark ? "hover:text-lime" : "hover:text-brand",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Cart"
            className={[
              "press hidden size-6 place-items-center transition-colors duration-200 md:grid",
              onDark ? "hover:text-lime" : "hover:text-brand",
            ].join(" ")}
          >
            <Icon name="shopping-bag" size={20} />
          </button>
        </div>

        <MobileNav tone={onDark ? "light" : "dark"} />
      </div>
    </header>
  );
}

export function AuthHeader() {
  return (
    <header className="w-full border-b border-line bg-white">
      <div className="mx-auto flex h-[88px] max-w-[1200px] items-center justify-between px-5 md:h-[120px] md:px-0">
        <Logo tone="dark" />
        <Link
          href="/"
          className="t-body-l text-ink transition-colors hover:text-brand"
        >
          Back to Home
        </Link>
      </div>
    </header>
  );
}
