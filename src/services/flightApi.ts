import type { Flight, SearchParams } from '../types/flight';

// Mock flight database
const mockFlights: Flight[] = [
  {
    id: 'AA123-JFK-LAX-001',
    flightNumber: 'AA123',
    airline: 'American Airlines',
    airlineCode: 'AA',
    origin: 'JFK',
    originCity: 'New York',
    destination: 'LAX',
    destinationCity: 'Los Angeles',
    departureTime: '2025-11-03T08:00:00',
    arrivalTime: '2025-11-03T11:30:00',
    scheduledDeparture: '2025-11-03T08:00:00',
    scheduledArrival: '2025-11-03T11:30:00',
    status: 'On Time',
    duration: '5h 30m',
    aircraft: 'Boeing 737-800',
    terminal: 'T8',
    gate: 'A24',
    arrivalTerminal: 'T4',
    arrivalGate: 'B12',
  },
  {
    id: 'DL456-ATL-ORD-002',
    flightNumber: 'DL456',
    airline: 'Delta Air Lines',
    airlineCode: 'DL',
    origin: 'ATL',
    originCity: 'Atlanta',
    destination: 'ORD',
    destinationCity: 'Chicago',
    departureTime: '2025-11-03T09:15:00',
    arrivalTime: '2025-11-03T10:45:00',
    scheduledDeparture: '2025-11-03T09:00:00',
    scheduledArrival: '2025-11-03T10:30:00',
    estimatedDeparture: '2025-11-03T09:15:00',
    estimatedArrival: '2025-11-03T10:45:00',
    status: 'Delayed',
    duration: '1h 45m',
    aircraft: 'Airbus A320',
    terminal: 'T1',
    gate: 'C15',
    arrivalTerminal: 'T2',
    arrivalGate: 'E8',
    delayMinutes: 15,
  },
  {
    id: 'UA789-SFO-DEN-003',
    flightNumber: 'UA789',
    airline: 'United Airlines',
    airlineCode: 'UA',
    origin: 'SFO',
    originCity: 'San Francisco',
    destination: 'DEN',
    destinationCity: 'Denver',
    departureTime: '2025-11-03T14:30:00',
    arrivalTime: '2025-11-03T18:00:00',
    scheduledDeparture: '2025-11-03T14:30:00',
    scheduledArrival: '2025-11-03T18:00:00',
    status: 'Boarding',
    duration: '2h 30m',
    aircraft: 'Boeing 757-200',
    terminal: 'T3',
    gate: 'G22',
    arrivalTerminal: 'T1',
    arrivalGate: 'A5',
  },
  {
    id: 'SW234-LAS-PHX-004',
    flightNumber: 'SW234',
    airline: 'Southwest Airlines',
    airlineCode: 'WN',
    origin: 'LAS',
    originCity: 'Las Vegas',
    destination: 'PHX',
    destinationCity: 'Phoenix',
    departureTime: '2025-11-03T11:00:00',
    arrivalTime: '2025-11-03T12:15:00',
    scheduledDeparture: '2025-11-03T11:00:00',
    scheduledArrival: '2025-11-03T12:15:00',
    actualDeparture: '2025-11-03T11:05:00',
    status: 'Departed',
    duration: '1h 15m',
    aircraft: 'Boeing 737-700',
    terminal: 'T1',
    gate: 'D18',
    arrivalTerminal: 'T4',
    arrivalGate: 'B23',
  },
  {
    id: 'BA100-LHR-JFK-005',
    flightNumber: 'BA100',
    airline: 'British Airways',
    airlineCode: 'BA',
    origin: 'LHR',
    originCity: 'London',
    destination: 'JFK',
    destinationCity: 'New York',
    departureTime: '2025-11-03T10:00:00',
    arrivalTime: '2025-11-03T13:00:00',
    scheduledDeparture: '2025-11-03T10:00:00',
    scheduledArrival: '2025-11-03T13:00:00',
    status: 'Cancelled',
    duration: '8h',
    aircraft: 'Boeing 787-9',
    terminal: 'T5',
    gate: 'A12',
    arrivalTerminal: 'T7',
    arrivalGate: 'C4',
  },
  {
    id: 'AA567-LAX-MIA-006',
    flightNumber: 'AA567',
    airline: 'American Airlines',
    airlineCode: 'AA',
    origin: 'LAX',
    originCity: 'Los Angeles',
    destination: 'MIA',
    destinationCity: 'Miami',
    departureTime: '2025-11-03T16:45:00',
    arrivalTime: '2025-11-03T00:30:00',
    scheduledDeparture: '2025-11-03T16:45:00',
    scheduledArrival: '2025-11-04T00:30:00',
    status: 'On Time',
    duration: '4h 45m',
    aircraft: 'Boeing 777-300ER',
    terminal: 'T4',
    gate: 'B42',
    arrivalTerminal: 'T3',
    arrivalGate: 'D15',
  },
  {
    id: 'DL890-SEA-BOS-007',
    flightNumber: 'DL890',
    airline: 'Delta Air Lines',
    airlineCode: 'DL',
    origin: 'SEA',
    originCity: 'Seattle',
    destination: 'BOS',
    destinationCity: 'Boston',
    departureTime: '2025-11-03T07:30:00',
    arrivalTime: '2025-11-03T16:00:00',
    scheduledDeparture: '2025-11-03T07:30:00',
    scheduledArrival: '2025-11-03T16:00:00',
    actualDeparture: '2025-11-03T07:35:00',
    actualArrival: '2025-11-03T16:05:00',
    status: 'Landed',
    duration: '5h 30m',
    aircraft: 'Airbus A321neo',
    terminal: 'T1',
    gate: 'N12',
    arrivalTerminal: 'T1',
    arrivalGate: 'C19',
  },
  {
    id: 'UA321-IAH-SFO-008',
    flightNumber: 'UA321',
    airline: 'United Airlines',
    airlineCode: 'UA',
    origin: 'IAH',
    originCity: 'Houston',
    destination: 'SFO',
    destinationCity: 'San Francisco',
    departureTime: '2025-11-03T13:20:00',
    arrivalTime: '2025-11-03T15:30:00',
    scheduledDeparture: '2025-11-03T13:20:00',
    scheduledArrival: '2025-11-03T15:30:00',
    status: 'On Time',
    duration: '4h 10m',
    aircraft: 'Boeing 737 MAX 9',
    terminal: 'T2',
    gate: 'E45',
    arrivalTerminal: 'T3',
    arrivalGate: 'F12',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function searchFlights(params: SearchParams): Promise<Flight[]> {
  await delay(800); // Simulate network delay

  let results = mockFlights;

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
  await delay(500);
  return mockFlights;
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
