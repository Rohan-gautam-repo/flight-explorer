import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBookmark } from 'react-icons/fi';
import { useWatchlist } from '../contexts/WatchlistContext';

export function Header() {
  const { watchlist } = useWatchlist();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl">✈️</span>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">
              Flight Explorer
            </span>
            <span className="text-xl font-bold text-gray-900 sm:hidden">
              Flights
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition ${
                isActive('/')
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiHome className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/watchlist"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition relative ${
                isActive('/watchlist')
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiBookmark className="w-5 h-5" />
              <span className="hidden sm:inline">Watchlist</span>
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
