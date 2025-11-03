import { useState, useEffect } from 'react';
import type { Flight, SearchParams } from '../types/flight';
import { FlightSearchForm } from '../components/FlightSearchForm';
import { FlightList } from '../components/FlightList';
import { getAllFlights } from '../services/flightApi';

export function Home() {
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleSearch = (params: SearchParams) => {
    console.log('🔍 Search initiated with params:', params);
    setHasSearched(true);
    
    let results = [...allFlights];
    console.log('📊 Total flights available:', results.length);

    // If no search params provided, show all flights
    if (!params.flightNumber && !params.origin && !params.destination) {
      console.log('✅ Showing all flights');
      setFilteredFlights(results);
      return;
    }

    // Filter by flight number
    if (params.flightNumber) {
      const searchTerm = params.flightNumber.toUpperCase().trim();
      console.log('🔎 Searching by flight number:', searchTerm);
      results = results.filter(flight => {
        const matches = flight.flightNumber.toUpperCase().includes(searchTerm);
        if (matches) {
          console.log('✅ Match found:', flight.flightNumber);
        }
        return matches;
      });
    }

    // Filter by route
    const hasOrigin = !!params.origin?.trim();
    const hasDestination = !!params.destination?.trim();
    
    if (hasOrigin && hasDestination) {
      const origin = params.origin!.toUpperCase().trim();
      const destination = params.destination!.toUpperCase().trim();
      console.log('🔎 Searching by route:', origin, '→', destination);
      results = results.filter(flight => {
        const matches = flight.origin.toUpperCase() === origin &&
                       flight.destination.toUpperCase() === destination;
        if (matches) {
          console.log('✅ Match found:', flight.flightNumber, flight.origin, '→', flight.destination);
        }
        return matches;
      });
    } else if (hasOrigin) {
      const origin = params.origin!.toUpperCase().trim();
      console.log('🔎 Searching by origin:', origin);
      results = results.filter(flight => {
        const matches = flight.origin.toUpperCase() === origin;
        if (matches) {
          console.log('✅ Match found:', flight.flightNumber, 'from', flight.origin);
        }
        return matches;
      });
    } else if (hasDestination) {
      const destination = params.destination!.toUpperCase().trim();
      console.log('🔎 Searching by destination:', destination);
      results = results.filter(flight => {
        const matches = flight.destination.toUpperCase() === destination;
        if (matches) {
          console.log('✅ Match found:', flight.flightNumber, 'to', flight.destination);
        }
        return matches;
      });
    }

    console.log('📊 Search results:', results.length, 'flights found');
    setFilteredFlights(results);
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unable to Load Flights</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <FlightSearchForm onSearch={handleSearch} isLoading={false} />
        </div>

        {/* Flight Results */}
        <FlightList 
          flights={filteredFlights} 
          isLoading={isLoading} 
          hasSearched={hasSearched} 
        />
      </div>
    </div>
  );
}
