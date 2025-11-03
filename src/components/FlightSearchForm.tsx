import { useState, useEffect, useMemo } from 'react';
import type { FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import type { SearchParams } from '../types/flight';
import { getAllFlights } from '../services/flightApi';
import { useDebounce } from '../hooks/useDebounce';

interface FlightSearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

interface AirportSuggestion {
  code: string;
  city: string;
  name: string;
}

export function FlightSearchForm({ onSearch, isLoading }: FlightSearchFormProps) {
  const [searchMode, setSearchMode] = useState<'flightNumber' | 'route'>('flightNumber');
  const [flightNumber, setFlightNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [airports, setAirports] = useState<AirportSuggestion[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  // Debounce the search inputs
  const debouncedOrigin = useDebounce(origin, 300);
  const debouncedDestination = useDebounce(destination, 300);

  // Load airports from flights on mount
  useEffect(() => {
    const loadAirports = async () => {
      try {
        const flights = await getAllFlights();
        const airportMap = new Map<string, AirportSuggestion>();

        flights.forEach(flight => {
          if (!airportMap.has(flight.origin)) {
            airportMap.set(flight.origin, {
              code: flight.origin,
              city: flight.originCity,
              name: `${flight.origin} - ${flight.originCity}`
            });
          }
          if (!airportMap.has(flight.destination)) {
            airportMap.set(flight.destination, {
              code: flight.destination,
              city: flight.destinationCity,
              name: `${flight.destination} - ${flight.destinationCity}`
            });
          }
        });

        setAirports(Array.from(airportMap.values()).sort((a, b) => a.code.localeCompare(b.code)));
      } catch (error) {
        console.error('Error loading airports:', error);
      }
    };
    loadAirports();
  }, []);

  // Filter airport suggestions
  const originSuggestions = useMemo(() => {
    if (!debouncedOrigin || debouncedOrigin.length < 1) return [];
    const search = debouncedOrigin.toUpperCase();
    return airports.filter(airport => 
      airport.code.startsWith(search) || 
      airport.city.toUpperCase().includes(search)
    ).slice(0, 5);
  }, [debouncedOrigin, airports]);

  const destinationSuggestions = useMemo(() => {
    if (!debouncedDestination || debouncedDestination.length < 1) return [];
    const search = debouncedDestination.toUpperCase();
    return airports.filter(airport => 
      airport.code.startsWith(search) || 
      airport.city.toUpperCase().includes(search)
    ).slice(0, 5);
  }, [debouncedDestination, airports]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (searchMode === 'flightNumber') {
      if (!flightNumber.trim()) {
        newErrors.flightNumber = 'Flight number is required';
      }
    } else {
      if (!origin.trim()) {
        newErrors.origin = 'Origin airport is required';
      } else if (origin.trim().length !== 3) {
        newErrors.origin = 'Airport code must be 3 letters';
      }
      if (!destination.trim()) {
        newErrors.destination = 'Destination airport is required';
      } else if (destination.trim().length !== 3) {
        newErrors.destination = 'Airport code must be 3 letters';
      }
      if (origin.trim().toUpperCase() === destination.trim().toUpperCase()) {
        newErrors.destination = 'Origin and destination must be different';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (searchMode === 'flightNumber') {
      onSearch({ flightNumber: flightNumber.trim() });
    } else {
      onSearch({ 
        origin: origin.trim().toUpperCase(), 
        destination: destination.trim().toUpperCase() 
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Flights</h2>

      {/* Search Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => {
            setSearchMode('flightNumber');
            setErrors({});
          }}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
            searchMode === 'flightNumber'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Flight Number
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchMode('route');
            setErrors({});
          }}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
            searchMode === 'route'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Route
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {searchMode === 'flightNumber' ? (
          <div>
            <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Flight Number
            </label>
            <input
              type="text"
              id="flightNumber"
              value={flightNumber}
              onChange={(e) => {
                setFlightNumber(e.target.value);
                if (errors.flightNumber) {
                  setErrors({ ...errors, flightNumber: '' });
                }
              }}
              placeholder="e.g., AA123"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.flightNumber ? 'border-red-300' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
            />
            {errors.flightNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.flightNumber}</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                Origin Airport
              </label>
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value.toUpperCase());
                  setShowOriginSuggestions(true);
                  if (errors.origin) {
                    setErrors({ ...errors, origin: '' });
                  }
                }}
                onFocus={() => setShowOriginSuggestions(true)}
                onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
                placeholder="e.g., JFK or New York"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.origin ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase`}
              />
              {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
              
              {/* Origin Suggestions */}
              {showOriginSuggestions && originSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {originSuggestions.map((airport) => (
                    <button
                      key={airport.code}
                      type="button"
                      onClick={() => {
                        setOrigin(airport.code);
                        setShowOriginSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 transition"
                    >
                      <div className="font-semibold text-gray-900">{airport.code}</div>
                      <div className="text-sm text-gray-600">{airport.city}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                Destination Airport
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value.toUpperCase());
                  setShowDestinationSuggestions(true);
                  if (errors.destination) {
                    setErrors({ ...errors, destination: '' });
                  }
                }}
                onFocus={() => setShowDestinationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
                placeholder="e.g., LAX or Los Angeles"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.destination ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase`}
              />
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
              )}
              
              {/* Destination Suggestions */}
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {destinationSuggestions.map((airport) => (
                    <button
                      key={airport.code}
                      type="button"
                      onClick={() => {
                        setDestination(airport.code);
                        setShowDestinationSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 transition"
                    >
                      <div className="font-semibold text-gray-900">{airport.code}</div>
                      <div className="text-sm text-gray-600">{airport.city}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-sm hover:shadow-md"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </>
          ) : (
            <>
              <FiSearch className="w-5 h-5" />
              <span>Search Flights</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
