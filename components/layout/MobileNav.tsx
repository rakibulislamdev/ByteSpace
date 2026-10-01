"use client";

import { Icon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { headerLinks, nav } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function MobileNav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const onDark = tone === "light";

  // Route change closes the drawer. The open route is tracked during
  // render and applied in an effect, so no setState runs synchronously
  // inside the effect body.
  const openRouteRef = useRef(pathname);
  useEffect(() => {
    if (openRouteRef.current !== pathname) {
      openRouteRef.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  // Escape closes, and focus moves into the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className={[
          "press grid size-10 place-items-center rounded-full md:hidden",
          onDark ? "text-on-dark" : "text-ink",
        ].join(" ")}
      >
        {open ? (
          <Icon name="chevron-left" size={20} />
        ) : (
          <Icon name="filter" size={20} />
        )}
      </button>

      {/* Scrim */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-40 bg-ink/40 transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* Sheet */}
      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label="Main menu"
        className={[
          "fixed inset-y-0 right-0 z-50 flex w-[300px] max-w-[85vw] flex-col gap-8 bg-white p-6 shadow-e6",
          "transition-transform duration-200 ease-out md:hidden",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        <div className="flex items-center justify-between">
          <Logo tone="dark" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="press grid size-10 place-items-center rounded-full text-ink"
          >
            <Icon name="chevron-left" size={20} />
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {[...nav, ...headerLinks].map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "t-h-m block rounded-sm px-3 py-3 transition-colors hover:bg-surface",
                      isActive ? "bg-surface text-brand font-medium" : "text-ink"
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
