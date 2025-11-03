import type { Flight, SearchParams } from '../types/flight';
import { fetchFlights as fetchFromApi } from '../api/flights';

// Cache for API flights
let flightCache: Flight[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all flights from API or cache
async function getFlightsFromApi(): Promise<Flight[]> {
  const now = Date.now();
  
  // Return cached data if it's still valid
  if (flightCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('Using cached flight data');
    return flightCache;
  }
  
  try {
    console.log('Fetching fresh flight data from API...');
    const flights = await fetchFromApi();
    flightCache = flights;
    cacheTimestamp = now;
    return flights;
  } catch (error) {
    console.error('Failed to fetch flights:', error);
    // Return empty array if both API and mock fail
    return [];
  }
}

export async function searchFlights(params: SearchParams): Promise<Flight[]> {
  await delay(300); // Small delay for better UX

  let results = await getFlightsFromApi();

  if (params.flightNumber) {
    const searchTerm = params.flightNumber.toUpperCase().trim();
    results = results.filter(flight =>
      flight.flightNumber.toUpperCase().includes(searchTerm)
    );
  }

  if (params.origin && params.destination) {
    const origin = params.origin.toUpperCase().trim();
    const destination = params.destination.toUpperCase().trim();
    results = results.filter(
      flight =>
        flight.origin.toUpperCase() === origin &&
        flight.destination.toUpperCase() === destination
    );
  }

  return results;
}

export async function getAllFlights(): Promise<Flight[]> {
  return await getFlightsFromApi();
}

// Airport codes for autocomplete (optional feature)
export const airportCodes = [
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International' },
  { code: 'ORD', city: 'Chicago', name: "O'Hare International" },
  { code: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson Atlanta International' },
  { code: 'DEN', city: 'Denver', name: 'Denver International' },
  { code: 'SFO', city: 'San Francisco', name: 'San Francisco International' },
  { code: 'SEA', city: 'Seattle', name: 'Seattle-Tacoma International' },
  { code: 'LAS', city: 'Las Vegas', name: 'Harry Reid International' },
  { code: 'PHX', city: 'Phoenix', name: 'Phoenix Sky Harbor International' },
  { code: 'MIA', city: 'Miami', name: 'Miami International' },
  { code: 'BOS', city: 'Boston', name: 'Boston Logan International' },
  { code: 'IAH', city: 'Houston', name: 'George Bush Intercontinental' },
  { code: 'LHR', city: 'London', name: 'London Heathrow' },
];
