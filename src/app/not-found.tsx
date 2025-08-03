export default function NotFound() {
  return (
    <div className="w-full md:max-w-[1200px] mx-auto py-10 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <h2 className="text-xl text-white/80 mb-4">Page Not Found</h2>
        <p className="text-white/50 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
} 