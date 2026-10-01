import Image from "next/image";

/** Circular avatar. Sizes in the design: 32, 43, 52, 80. */
export function Avatar({
  src,
  size = 43,
  alt,
  className = "",
}: {
  src: string;
  size?: number;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
}

/** Overlapping avatar stack used for the "Happy Students" social proof. */
export function AvatarStack({
  people,
  size = 43,
  overlap = -12,
}: {
  people: { src: string; name: string }[];
  size?: number;
  overlap?: number;
}) {
  return (
    <ul className="flex items-center">
      {people.map((p, i) => (
        <li
          key={p.src}
          className="rounded-full ring-2 ring-white"
          style={{ marginLeft: i === 0 ? 0 : overlap, zIndex: people.length - i }}
        >
          <Avatar src={p.src} size={size} alt={p.name} />
        </li>
      ))}
    </ul>
  );
}
