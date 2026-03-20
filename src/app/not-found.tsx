export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
          <div className="text-6xl">🔍</div>
          <h2 className="text-4xl font-bold text-gray-900">404</h2>
          <h3 className="text-xl font-semibold text-gray-700">Page Not Found</h3>
          <p className="text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go home
            </a>
            <a
              href="/contact"
              className="px-6 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
