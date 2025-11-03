import { useState } from 'react';
import { FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { useWatchlist } from '../context/WatchlistContext';
import { FlightCard } from '../components/FlightCard';

export function WatchlistPage() {
  const { watchlist, clearWatchlist } = useWatchlist();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearAll = () => {
    clearWatchlist();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Watchlist</h1>
            <p className="text-gray-600">
              {watchlist.length === 0
                ? 'No flights saved yet'
                : `${watchlist.length} ${watchlist.length === 1 ? 'flight' : 'flights'} saved`}
            </p>
          </div>
          {watchlist.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>

        {/* Clear Confirmation */}
        {showClearConfirm && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-medium mb-3">
                Are you sure you want to remove all flights from your watchlist?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                >
                  Yes, Clear All
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition font-medium border border-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Flight List */}
        {watchlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Saved Flights</h3>
            <p className="text-gray-600 mb-6">
              Start adding flights to your watchlist to keep track of them
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium shadow-sm hover:shadow-md"
            >
              Search Flights
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
