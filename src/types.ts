export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface FlightTime {
  scheduled: string;
  actual?: string;
  terminal?: string;
  gate?: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: Airport;
  destination: Airport;
  departure: FlightTime;
  arrival: FlightTime;
  status: string;
  aircraft?: string;
  duration?: string;
  delay?: number;
}
