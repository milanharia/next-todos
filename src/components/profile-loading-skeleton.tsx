export function ProfileLoadingSkeleton() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="bg-slate-800 h-full w-full rounded-full animate-pulse">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
