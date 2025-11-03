import type { Flight } from '../types/flight';
import { FlightCard } from './FlightCard';
import { LoadingSkeleton } from './shared/LoadingSkeleton';

interface FlightListProps {
  flights: Flight[];
  isLoading: boolean;
  hasSearched: boolean;
}

export function FlightList({ flights, isLoading, hasSearched }: FlightListProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">✈️</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Search for Flights</h3>
        <p className="text-gray-600">
          Enter a flight number or select a route to get started
        </p>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Flights Found</h3>
        <p className="text-gray-600">Try adjusting your search criteria</p>
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
