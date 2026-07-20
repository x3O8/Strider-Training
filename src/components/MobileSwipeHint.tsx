export default function MobileSwipeHint() {
  return (
    <div className="mb-3 flex justify-end sm:hidden" aria-hidden="true">
      <span className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] text-white/55">
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
          <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
