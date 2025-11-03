import { useState } from 'react';
import type { Flight, SearchParams } from '../types/flight';
import { FlightSearchForm } from '../components/FlightSearchForm';
import { FlightList } from '../components/FlightList';
import { searchFlights } from '../services/flightApi';

export function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await searchFlights(params);
      setFlights(results);
    } catch (error) {
      console.error('Error searching flights:', error);
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Flight Results */}
        <FlightList flights={flights} isLoading={isLoading} hasSearched={hasSearched} />
      </div>
    </div>
  );
}
