import type { Flight } from '../types/flight';
import { FlightCard } from './FlightCard';
import { LoadingSkeleton } from './shared/LoadingSkeleton';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';

interface FlightListProps {
  flights: Flight[];
  isLoading: boolean;
  hasSearched: boolean;
}

export function FlightList({ flights, isLoading, hasSearched }: FlightListProps) {
  console.log('🎨 FlightList: Rendering with props:', {
    flightsCount: flights.length,
    isLoading,
    hasSearched
  });
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">✈️</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Search for Flights</h3>
        <p className="text-gray-600 mb-4">
          Enter a flight number or select a route to get started
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FiSearch className="w-4 h-4" />
            <span>Search by flight number</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <FiSearch className="w-4 h-4" />
            <span>Search by route</span>
          </div>
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Flights Found</h3>
        <p className="text-gray-600 mb-6">
          We couldn't find any flights matching your search criteria
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm text-blue-900 font-medium mb-2">Try these suggestions:</p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Check your flight number spelling</li>
                <li>Verify airport codes are correct</li>
                <li>Try searching with city names</li>
                <li>Search for a different date or route</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {flights.length} {flights.length === 1 ? 'Flight' : 'Flights'} Found
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
}
