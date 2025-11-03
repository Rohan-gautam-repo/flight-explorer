import axios from "axios";
import type { Flight } from "../types";
import type { Flight as AppFlight } from "../types/flight";

const API_URL = "https://flight-explorer-api.codewalnut.com/api/flights";

// Convert API Flight format to App Flight format
function convertToAppFlight(apiFlight: Flight): AppFlight {
  return {
    id: apiFlight.id,
    flightNumber: apiFlight.flightNumber,
    airline: apiFlight.airline,
    airlineCode: apiFlight.airline.substring(0, 2).toUpperCase(),
    origin: apiFlight.origin.code,
    originCity: apiFlight.origin.city,
    destination: apiFlight.destination.code,
    destinationCity: apiFlight.destination.city,
    departureTime: apiFlight.departure.scheduled,
    arrivalTime: apiFlight.arrival.scheduled,
    scheduledDeparture: apiFlight.departure.scheduled,
    scheduledArrival: apiFlight.arrival.scheduled,
    actualDeparture: apiFlight.departure.actual,
    actualArrival: apiFlight.arrival.actual,
    estimatedDeparture: apiFlight.departure.actual,
    estimatedArrival: apiFlight.arrival.actual,
    status: apiFlight.status as any,
    duration: apiFlight.duration || '',
    aircraft: apiFlight.aircraft || '',
    terminal: apiFlight.departure.terminal,
    gate: apiFlight.departure.gate,
    arrivalTerminal: apiFlight.arrival.terminal,
    arrivalGate: apiFlight.arrival.gate,
    delayMinutes: apiFlight.delay,
  };
}

export async function fetchFlights(): Promise<AppFlight[]> {
  try {
    console.log("Attempting to fetch flights from API...");
    const res = await axios.get(API_URL, {
      timeout: 5000, // 5 second timeout
    });
    
    if (res.data && res.data.flights) {
      console.log("Successfully fetched flights from API");
      return res.data.flights.map(convertToAppFlight);
    }
    
    throw new Error("Invalid API response format");
  } catch (error) {
    console.warn("Failed to fetch from API, falling back to mock data:", error);
    
    // Fallback to local mock data
    try {
      const res = await fetch("/mock/flights.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Successfully loaded mock data");
      return data.flights.map(convertToAppFlight);
    } catch (fallbackError) {
      console.error("Failed to load mock data:", fallbackError);
      throw new Error("Unable to load flight data from both API and mock source");
    }
  }
}
