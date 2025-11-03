import { useState, useMemo, useEffect } from 'react';
import type { Flight, SearchParams } from '../types/flight';
import { FlightSearchForm } from '../components/FlightSearchForm';
import { FlightList } from '../components/FlightList';
import { getAllFlights } from '../services/flightApi';

export function Home() {
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all flights on mount
  useEffect(() => {
    const loadFlights = async () => {
      setIsLoading(true);
      try {
        const flights = await getAllFlights();
        setAllFlights(flights);
        setError(null);
      } catch (err) {
        console.error('Error loading flights:', err);
        setError('Failed to load flight data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadFlights();
  }, []);

  // Client-side filtering with useMemo
  const filteredFlights = useMemo(() => {
    if (!searchParams || !hasSearched) {
      return [];
    }

    let results = allFlights;

    // Filter by flight number
    if (searchParams.flightNumber) {
      const searchTerm = searchParams.flightNumber.toUpperCase().trim();
      results = results.filter(flight =>
        flight.flightNumber.toUpperCase().includes(searchTerm)
      );
    }

    // Filter by route (origin and destination)
    if (searchParams.origin && searchParams.destination) {
      const origin = searchParams.origin.toUpperCase().trim();
      const destination = searchParams.destination.toUpperCase().trim();
      
      results = results.filter(flight => {
        const matchesOrigin = 
          flight.origin.toUpperCase() === origin ||
          flight.originCity.toUpperCase().includes(origin);
        const matchesDestination = 
          flight.destination.toUpperCase() === destination ||
          flight.destinationCity.toUpperCase().includes(destination);
        
        return matchesOrigin && matchesDestination;
      });
    }

    return results;
  }, [allFlights, searchParams, hasSearched]);

  const handleSearch = async (params: SearchParams) => {
    setSearchParams(params);
    setHasSearched(true);
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Flights</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium shadow-sm hover:shadow-md"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Flight Results */}
        <FlightList 
          flights={filteredFlights} 
          isLoading={isLoading && !hasSearched} 
          hasSearched={hasSearched} 
        />
      </div>
    </div>
  );
}
