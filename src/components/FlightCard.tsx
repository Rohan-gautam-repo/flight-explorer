import { useState } from 'react';
import { FiMapPin, FiClock, FiInfo, FiStar } from 'react-icons/fi';
import dayjs from 'dayjs';
import type { Flight } from '../types/flight';
import { Badge } from './shared/Badge';
import { useWatchlist } from '../contexts/WatchlistContext';
import { FlightDetailsModal } from './FlightDetailsModal';

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(flight.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time':
      case 'Boarding':
      case 'Departed':
      case 'Landed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Delayed':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(flight.id);
    } else {
      addToWatchlist(flight);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Header: Airline and Flight Number */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
              {flight.airlineCode}
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{flight.flightNumber}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{flight.airline}</div>
            </div>
          </div>
          <Badge className={getStatusColor(flight.status)}>{flight.status}</Badge>
        </div>

        {/* Route */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{flight.originCity}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{flight.origin}</div>
          </div>
          <div className="flex-shrink-0 px-4">
            <FiMapPin className="text-gray-400 dark:text-gray-500" />
          </div>
          <div className="flex-1 text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{flight.destinationCity}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{flight.destination}</div>
          </div>
        </div>

        {/* Times */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <FiClock className="w-4 h-4" />
            <span>{dayjs(flight.departureTime).format('MMM D, HH:mm')}</span>
          </div>
          <div className="text-gray-400 dark:text-gray-500">{flight.duration}</div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
            <FiClock className="w-4 h-4" />
            <span>{dayjs(flight.arrivalTime).format('MMM D, HH:mm')}</span>
          </div>
        </div>

        {/* Aircraft */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {flight.aircraft}
          {flight.delayMinutes && (
            <span className="ml-2 text-yellow-600 dark:text-yellow-400 font-medium">
              • Delayed {flight.delayMinutes} min
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setShowDetails(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition font-medium"
          >
            <FiInfo className="w-4 h-4" />
            <span>Details</span>
          </button>
          <button
            onClick={handleWatchlistToggle}
            className={`p-2 rounded-lg transition ${
              inWatchlist
                ? 'text-yellow-500 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50'
                : 'text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <FiStar className={`w-5 h-5 ${inWatchlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <FlightDetailsModal flight={flight} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}
