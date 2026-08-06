export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-[22px] font-bold text-primary/500 leading-8">
        No ongoing lease
      </h1>
      <p className="mt-2 text-[#777777] max-w-lg leading-6">
        You do not have any ongoing lease(s) yet, when you do they will appear
        here.
      </p>
    </div>
  );
}
