# ✈️ Flight Explorer

A modern, responsive flight tracking and search application built with React, TypeScript, and Vite. Search for flights, view detailed information, and maintain a personal watchlist.

## 🌟 Features

### Core Functionality
- **🔍 Advanced Flight Search**: Search flights by flight number or route
- **📊 Real-time Flight Status**: View live status, delays, gates, and terminal information
- **⭐ Personal Watchlist**: Save and track your favorite flights
- **📱 Responsive Design**: Beautiful UI that works seamlessly on all devices
- **🎨 Dark Mode Support**: Built-in dark mode with persistent preferences

### Search Capabilities
- **Flight Number Search**: Find flights by airline code and number (e.g., `AA123`, `DL456`)
- **Route Search**: Search by origin/destination airport codes
- **Flexible Filtering**: Search by origin only, destination only, or complete route
- **Smart Validation**: Helpful error messages and search suggestions

### Flight Information
- **Detailed Flight Cards**: Comprehensive flight information display
- **Status Tracking**: Real-time status updates (On Time, Delayed, Cancelled, etc.)
- **Schedule Information**: Departure/arrival times with estimated and actual times
- **Terminal & Gate Data**: Complete gate and terminal information
- **Aircraft Details**: Aircraft type and registration information

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/Rohan-gautam-repo/flight-explorer.git
cd flight-explorer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## 🔍 How to Use

### 1. Search by Flight Number
1. Select the **"Flight Number"** tab in the search form
2. Enter a flight number:
   - Full flight number: `AA123`, `DL456`, `UA789`
   - Airline code only: `AA` (shows all American Airlines flights)
3. Click **"Search Flights"**

### 2. Search by Route
1. Select the **"Route"** tab in the search form
2. Enter airport codes:
   - **Origin**: `JFK`, `LAX`, `ORD`, `ATL`
   - **Destination**: `MIA`, `DEN`, `LAS`, `BOS`
   - You can search with origin only, destination only, or both
3. Click **"Search Flights"**

### 3. View Flight Details
- Click **"Details"** on any flight card to see comprehensive information
- View scheduled vs. actual times, gate information, and delay details

### 4. Manage Your Watchlist
- Click the **⭐ bookmark icon** on any flight card to add to watchlist
- Navigate to **"My Watchlist"** from the header
- Remove flights by clicking the bookmark icon again
- Clear all flights with the **"Clear All"** button

## 📁 Project Structure

```
flight-explorer/
├── src/
│   ├── api/                    # API configuration and endpoints
│   │   └── flights.ts
│   ├── components/             # Reusable React components
│   │   ├── shared/            # Shared UI components
│   │   │   ├── Badge.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   ├── FlightCard.tsx     # Individual flight display
│   │   ├── FlightDetailsModal.tsx  # Detailed flight information
│   │   ├── FlightList.tsx     # Flight results container
│   │   ├── FlightSearchForm.tsx    # Search interface
│   │   └── Header.tsx         # Navigation header
│   ├── contexts/              # React Context for state management
│   │   ├── ThemeContext.tsx   # Dark mode theme management
│   │   └── WatchlistContext.tsx    # Watchlist state management
│   ├── hooks/                 # Custom React hooks
│   │   ├── useDebounce.ts     # Debounced input handling
│   │   └── useLocalStorage.ts # localStorage persistence
│   ├── pages/                 # Page components
│   │   ├── Home.tsx           # Main search and results page
│   │   └── WatchlistPage.tsx  # Saved flights page
│   ├── services/              # Business logic and API services
│   │   └── flightApi.ts       # Flight data service
│   ├── types/                 # TypeScript type definitions
│   │   └── flight.ts          # Flight data interfaces
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and Tailwind CSS
├── public/
│   └── mock/                  # Mock data for development
│       └── flights.json       # Sample flight data
├── test-api.js                # API connectivity testing
└── PROJECT_STRUCTURE.md       # Detailed project documentation
```

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern UI framework with hooks and functional components
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Comprehensive icon library (Feather icons)

### State Management & Navigation
- **React Context API** - Global state management
- **React Router v6** - Client-side routing
- **localStorage** - Persistent data storage

### Data & API
- **Axios** - HTTP client for API requests
- **Day.js** - Date/time manipulation and formatting
- **Mock Data** - Fallback for offline development

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎨 Features in Detail

### Dark Mode Support
The application includes a comprehensive dark mode implementation:
- **Automatic Detection**: Respects system preferences
- **Manual Toggle**: User-controlled theme switching
- **Persistent Storage**: Remembers user preference
- **Complete Coverage**: All components support both themes

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adjusted layouts for medium screens
- **Desktop Enhancement**: Full-featured desktop experience
- **Touch-Friendly**: Large touch targets and gesture support

### Performance Optimizations
- **Code Splitting**: Lazy loading for optimal bundle size
- **Debounced Search**: Reduced API calls during typing
- **Memoized Components**: Prevent unnecessary re-renders
- **Optimized Images**: Compressed and responsive images

## � API Integration

### Primary API
- **Endpoint**: `https://flight-explorer-api.codewalnut.com/api/flights`
- **Method**: GET
- **Response Format**: `{ flights: Flight[] }`

### Fallback Data
- **Local Mock**: `/public/mock/flights.json`
- **Automatic Fallback**: Switches to mock data if API is unavailable

### Testing API Connectivity
```bash
# Test API endpoint
node test-api.js
```

## 🧪 Development & Testing

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Development Features
- **Hot Module Replacement (HMR)**: Instant updates during development
- **TypeScript Support**: Full type checking and IntelliSense
- **Console Debugging**: Detailed search and API logs
- **Error Boundaries**: Graceful error handling

## 🐛 Debugging & Troubleshooting

### Browser DevTools
Open DevTools (F12) and check the Console for:
- 🔍 Search parameters and filters
- 📊 Flight counts and match results
- ⚠️ API errors and fallback usage
- 🎯 Component render cycles

### Common Issues
1. **No Search Results**: Check airport codes and try different combinations
2. **API Errors**: Application automatically falls back to mock data
3. **Performance**: Clear browser cache and localStorage if needed

## � Recent Updates

### Latest Features
✅ **Enhanced Search**: Improved flight number and route search  
✅ **Dark Mode**: Complete dark theme implementation  
✅ **Responsive Design**: Mobile-first responsive layout  
✅ **Performance**: Optimized API calls and component rendering  
✅ **Type Safety**: Full TypeScript integration  
✅ **Error Handling**: Graceful fallbacks and user feedback  

### Bug Fixes
✅ **Search Functionality**: Fixed all search-related issues  
✅ **Type Conflicts**: Resolved TypeScript interface conflicts  
✅ **API Integration**: Improved error handling and fallbacks  
✅ **State Management**: Fixed watchlist persistence  
✅ **UI Components**: Resolved styling and layout issues  

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Add appropriate error handling
- Update documentation as needed

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [GitHub](https://github.com/Rohan-gautam-repo/flight-explorer)
- **Live Demo**: [Coming Soon]
- **API Documentation**: [Coming Soon]
- **Issue Tracker**: [GitHub Issues](https://github.com/Rohan-gautam-repo/flight-explorer/issues)

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**


```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
