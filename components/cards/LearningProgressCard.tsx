import { ProgressBar } from "@/components/ui/ProgressBar";

/**
 * Floating card showing course completion. The bar animates its fill on
 * mount, so the card reads as live rather than static.
 */
export function LearningProgressCard({
  label = "Learning Progress",
  value = 55,
  className = "",
}: {
  label?: string;
  /** Percentage complete, 0-100. */
  value?: number;
  className?: string;
}) {
  return (
    <div className={`w-full rounded-lg bg-white p-5 shadow-e4 md:w-[232px] ${className}`}>
      <p className="t-body-s text-ink">{label}</p>
      <p className="t-display-md mt-3 text-ink">{value}%</p>
      <ProgressBar value={value} className="mt-3" />
    </div>
  );
}
