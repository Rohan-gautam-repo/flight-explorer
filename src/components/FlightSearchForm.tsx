import { useState } from 'react';
import type { FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import type { SearchParams } from '../types/flight';

interface FlightSearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export function FlightSearchForm({ onSearch, isLoading }: FlightSearchFormProps) {
  const [searchMode, setSearchMode] = useState<'flightNumber' | 'route'>('flightNumber');
  const [flightNumber, setFlightNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (searchMode === 'flightNumber') {
      if (!flightNumber.trim()) {
        newErrors.flightNumber = 'Flight number is required';
      }
    } else {
      const hasOrigin = !!origin.trim();
      const hasDestination = !!destination.trim();

      // Require at least one of origin or destination
      if (!hasOrigin && !hasDestination) {
        newErrors.origin = 'Enter origin and/or destination';
        newErrors.destination = 'Enter origin and/or destination';
      }

      // If both provided, they must be different
      if (hasOrigin && hasDestination &&
          origin.trim().toUpperCase() === destination.trim().toUpperCase()) {
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
      onSearch({ 
        flightNumber: flightNumber.trim().toUpperCase()
      });
    } else {
      const params: { origin?: string; destination?: string } = {};
      if (origin.trim()) params.origin = origin.trim().toUpperCase();
      if (destination.trim()) params.destination = destination.trim().toUpperCase();
      onSearch(params);
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
                setFlightNumber(e.target.value.toUpperCase());
                if (errors.flightNumber) {
                  setErrors({ ...errors, flightNumber: '' });
                }
              }}
              placeholder="e.g., AA123 or AA"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.flightNumber ? 'border-red-300' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase`}
            />
            {errors.flightNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.flightNumber}</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                Origin Airport
              </label>
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value.toUpperCase());
                  if (errors.origin) {
                    setErrors({ ...errors, origin: '' });
                  }
                }}
                placeholder="e.g., JFK or MIA"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.origin ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase`}
              />
              {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                Destination Airport
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value.toUpperCase());
                  if (errors.destination) {
                    setErrors({ ...errors, destination: '' });
                  }
                }}
                placeholder="e.g., LAX or DEN"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.destination ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase`}
              />
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
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

        {/* Show All Flights */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            setErrors({});
            onSearch({}); // show all flights
          }}
          className="w-full mt-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition"
        >
          Show All Flights
        </button>
      </form>
    </div>
  );
}
