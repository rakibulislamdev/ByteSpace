"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/icons";

const TABS = [
  { id: "about", label: "About", icon: "align-left" as IconName },
  { id: "lessons", label: "Lessons", icon: "play-circle" as IconName },
  { id: "reviews", label: "Reviews", icon: "star-blue" as IconName },
];

export function CourseTabs({ 
  activeTab, 
  setActiveTab 
}: { 
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <nav aria-label="Course sections">
      <ul className="flex flex-wrap gap-4">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={active ? "page" : undefined}
                className={[
                  "tab-pill t-body-l inline-flex items-center gap-2 rounded-full px-4 py-3 font-medium",
                  active
                    ? "bg-lime text-ink"
                    : "bg-surface text-muted hover:text-ink",
                ].join(" ")}
              >
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
