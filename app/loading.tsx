export default function Loading() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 bg-bg-primary">
      <div className="text-center">
        {/* Spinner */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="h-12 w-12 rounded-full border-4 border-primary-200 border-t-primary-700 animate-spin" />
        </div>

        {/* Brand */}
        <p className="font-serif text-xl font-semibold text-primary-900 mb-2">
          MindBridge Psychology
        </p>
        <p className="text-sand-500 text-sm">Loading...</p>
      </div>
    </section>
  );
}
