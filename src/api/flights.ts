import axios from "axios";
import type { Flight as AppFlight, FlightStatus } from "../types/flight";

const API_URL = "https://flight-explorer-api.codewalnut.com/api/flights";

// API Response type
interface APIAirport {
  code: string;
  name: string;
  city: string;
}

interface APIFlightTime {
  scheduled: string;
  actual?: string;
  estimated?: string;
  terminal?: string;
  gate?: string;
}

interface APIFlight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: APIAirport;
  destination: APIAirport;
  departure: APIFlightTime;
  arrival: APIFlightTime;
  status: string;
  aircraft?: string;
  duration?: string;
  delay?: number;
}

// Convert API Flight format to App Flight format
function convertToAppFlight(apiFlight: APIFlight): AppFlight {
  // Extract airline code from flight number (e.g., "AA123" -> "AA")
  const airlineCode = apiFlight.flightNumber.replace(/[0-9]/g, '').toUpperCase();
  
  return {
    id: apiFlight.id,
    flightNumber: apiFlight.flightNumber,
    airline: apiFlight.airline,
    airlineCode: airlineCode || apiFlight.airline.substring(0, 2).toUpperCase(),
    origin: apiFlight.origin.code,
    originCity: apiFlight.origin.city,
    destination: apiFlight.destination.code,
    destinationCity: apiFlight.destination.city,
    departureTime: apiFlight.departure.scheduled,
    arrivalTime: apiFlight.arrival.scheduled,
    scheduledDeparture: apiFlight.departure.scheduled,
    scheduledArrival: apiFlight.arrival.scheduled,
    actualDeparture: apiFlight.departure.actual || undefined,
    actualArrival: undefined,
    estimatedDeparture: apiFlight.departure.actual || apiFlight.departure.scheduled,
    estimatedArrival: apiFlight.arrival.estimated || apiFlight.arrival.scheduled,
  status: apiFlight.status as FlightStatus,
    duration: apiFlight.duration || '',
    aircraft: apiFlight.aircraft || '',
    terminal: apiFlight.departure.terminal || '',
    gate: apiFlight.departure.gate || '',
    arrivalTerminal: apiFlight.arrival.terminal || '',
    arrivalGate: apiFlight.arrival.gate || '',
    delayMinutes: apiFlight.delay || 0,
  };
}

export async function fetchFlights(): Promise<AppFlight[]> {
  try {
    const res = await axios.get(API_URL, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (res.data && res.data.flights && Array.isArray(res.data.flights)) {
      return res.data.flights.map(convertToAppFlight);
    }
    
    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching from API, trying mock data:", error);
    
    // Fallback to local mock data
    try {
      const res = await fetch("/mock/flights.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      
      if (data && data.flights && Array.isArray(data.flights)) {
        return data.flights.map(convertToAppFlight);
      }

      throw new Error("Invalid mock data format");
    } catch (fallbackError) {
      console.error("Failed to load mock data:", fallbackError);
      throw new Error("Unable to load flight data from both API and mock source");
    }
  }
}
