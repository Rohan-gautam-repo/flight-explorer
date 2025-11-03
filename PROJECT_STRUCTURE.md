# Flight Explorer - Project Structure

## 📁 Clean Directory Structure

```
flight-explorer/
├── public/
│   └── mock/
│       └── flights.json           # Fallback mock data
├── src/
│   ├── api/
│   │   └── flights.ts             # API integration layer
│   ├── components/
│   │   ├── FlightCard.tsx         # Individual flight card
│   │   ├── FlightDetailsModal.tsx # Flight details popup
│   │   ├── FlightList.tsx         # List of flights with empty states
│   │   ├── FlightSearchForm.tsx   # Search form with validation
│   │   ├── Header.tsx             # App header with navigation
│   │   └── shared/
│   │       ├── Badge.tsx          # Status badge component
│   │       └── LoadingSkeleton.tsx # Loading placeholder
│   ├── contexts/
│   │   └── WatchlistContext.tsx   # Watchlist state management
│   ├── hooks/
│   │   ├── useDebounce.ts         # Debounce hook
│   │   └── useLocalStorage.ts     # Local storage hook
│   ├── pages/
│   │   ├── Home.tsx               # Main search page
│   │   └── WatchlistPage.tsx      # Saved flights page
│   ├── services/
│   │   └── flightApi.ts           # Flight data service layer
│   ├── types/
│   │   └── flight.ts              # TypeScript type definitions
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # App entry point
│   └── index.css                  # Global styles
├── test-api.js                    # API testing script
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## 🗑️ Removed Duplicate Files

The following duplicate files were identified and removed to clean up the project:

1. **src/context/** - Duplicate of `src/contexts/` (removed)
2. **src/types.ts** - Duplicate of `src/types/flight.ts` (removed)

## 🔧 Fixed Issues

### 1. Search Functionality
- **Problem**: Search was not working because of incorrect property access
- **Solution**: Updated search logic to correctly access `flight.origin` and `flight.destination` properties
- **Files Modified**: 
  - `src/pages/Home.tsx`
  - `src/services/flightApi.ts`

### 2. Type Conflicts
- **Problem**: Two conflicting Flight type definitions existed
- **Solution**: Removed duplicate `types.ts`, kept `types/flight.ts` with proper structure
- **Files Modified**: `src/api/flights.ts`

### 3. API Integration
- **Problem**: API response structure didn't match expected format
- **Solution**: Created proper type mapping in `flights.ts` with `convertToAppFlight` function
- **Files Modified**: `src/api/flights.ts`

## 🚀 How to Use

### Search by Flight Number
1. Select "Flight Number" tab
2. Enter flight number (e.g., "AA123" or just "AA")
3. Click "Search Flights"

### Search by Route
1. Select "Route" tab
2. Enter origin airport code (e.g., "JFK")
3. Enter destination airport code (e.g., "LAX")
4. Click "Search Flights"

### View All Flights
- Click "Show All Flights" button to see all available flights

## 🔍 Debugging

Search operations now include console logging:
- `🔍 Search initiated` - Shows search parameters
- `📊 Total flights available` - Shows flight count
- `🔎 Searching by...` - Shows search criteria
- `✅ Match found` - Shows matched flights
- `📊 Search results` - Shows final count

Open browser DevTools (F12) to see these logs.

## 🛠️ Technical Details

### Flight Type Structure
```typescript
interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: string;              // Airport code (e.g., "JFK")
  originCity: string;          // City name
  destination: string;         // Airport code (e.g., "LAX")
  destinationCity: string;     // City name
  departureTime: string;
  arrivalTime: string;
  status: FlightStatus;
  // ... more fields
}
```

### API Endpoint
- **URL**: `https://flight-explorer-api.codewalnut.com/api/flights`
- **Fallback**: `/mock/flights.json`
- **Response Format**: `{ flights: Flight[] }`

## 📝 Notes

- All airport codes are automatically converted to uppercase
- Search is case-insensitive
- Partial matching works for flight numbers
- Exact matching required for airport codes
