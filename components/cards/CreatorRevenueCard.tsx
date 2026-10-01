/**
 * Brand-blue revenue tile used only in the creator band. Unlike the white
 * proof cards it sits on the light background, so it is inverted.
 */
export function CreatorRevenueCard({
  title,
  period,
  amount,
  className = "",
}: {
  title: string;
  period: string;
  amount: string;
  className?: string;
}) {
  return (
    <div className={`w-full rounded-md bg-brand p-4 text-on-dark md:w-[175px] ${className}`}>
      <p className="t-label text-on-dark-muted">{title}</p>
      <p className="t-body-s text-on-dark-muted">{period}</p>
      <p className="t-display-sm mt-2 text-on-dark">{amount}</p>
    </div>
  );
}
