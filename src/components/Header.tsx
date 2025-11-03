import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBookmark } from 'react-icons/fi';
import { useWatchlist } from '../contexts/WatchlistContext';

export function Header() {
  const { watchlist } = useWatchlist();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl">✈️</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
              Flight Explorer
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white sm:hidden">
              Flights
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition ${
                isActive('/')
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FiHome className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/watchlist"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition relative ${
                isActive('/watchlist')
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FiBookmark className="w-5 h-5" />
              <span className="hidden sm:inline">Watchlist</span>
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
