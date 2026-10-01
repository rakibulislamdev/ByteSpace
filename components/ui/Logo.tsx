import Image from "next/image";
import Link from "next/link";

export function Logo({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-[10px] ${className}`}
      aria-label="ByteSpace home"
    >
      <Image
        src="/assets/icons/Vector.svg"
        alt="ByteSpace"
        width={29}
        height={32}
      />
      <span
        className={`t-logo ${tone === "light" ? "text-on-dark" : "text-ink"}`}
      >
        ByteSpace
      </span>
    </Link>
  );
}
