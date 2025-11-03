export type FlightStatus = 'On Time' | 'Delayed' | 'Cancelled' | 'Boarding' | 'Departed' | 'Landed';

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  estimatedDeparture?: string;
  estimatedArrival?: string;
  actualDeparture?: string;
  actualArrival?: string;
  status: FlightStatus;
  duration: string;
  aircraft: string;
  terminal?: string;
  gate?: string;
  arrivalTerminal?: string;
  arrivalGate?: string;
  delayMinutes?: number;
}

export interface SearchParams {
  flightNumber?: string;
  origin?: string;
  destination?: string;
}
