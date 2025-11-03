import type { Flight, SearchParams } from '../types/flight';
import { fetchFlights as fetchFromApi } from '../api/flights';

// Get all flights from API
export async function getAllFlights(): Promise<Flight[]> {
  try {
    const flights = await fetchFromApi();
    return flights;
  } catch (error) {
    console.error('Failed to fetch flights:', error);
    return [];
  }
}

// Search flights (kept for compatibility, but search logic is now in Home component)
export async function searchFlights(params: SearchParams): Promise<Flight[]> {
  const allFlights = await getAllFlights();
  let results = [...allFlights];

  // Filter by flight number
  if (params.flightNumber) {
    const searchTerm = params.flightNumber.toUpperCase().trim();
    results = results.filter(flight =>
      flight.flightNumber.toUpperCase().includes(searchTerm)
    );
  }

  // Filter by route (origin and/or destination)
  const hasOrigin = !!params.origin?.trim();
  const hasDestination = !!params.destination?.trim();
  
  if (hasOrigin && hasDestination) {
    const origin = params.origin!.toUpperCase().trim();
    const destination = params.destination!.toUpperCase().trim();
    results = results.filter(
      flight =>
        flight.origin.toUpperCase() === origin &&
        flight.destination.toUpperCase() === destination
    );
  } else if (hasOrigin) {
    const origin = params.origin!.toUpperCase().trim();
    results = results.filter(
      flight => flight.origin.toUpperCase() === origin
    );
  } else if (hasDestination) {
    const destination = params.destination!.toUpperCase().trim();
    results = results.filter(
      flight => flight.destination.toUpperCase() === destination
    );
  }

  return results;
}
