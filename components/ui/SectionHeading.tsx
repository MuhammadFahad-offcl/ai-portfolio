type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
  eyebrow?: string;
};

export default function SectionHeading({
  id,
  title,
  description,
  eyebrow,
}: SectionHeadingProps) {
  return (
    <header className="mb-10 max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#111] sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}
    </header>
  );
}
