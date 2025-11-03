# ✈️ Flight Explorer

A modern, real-time flight tracking and search application built with React, TypeScript, and Vite.

## 🌟 Features

- **Real-time Flight Search**: Search flights by flight number or route
- **Live Flight Status**: Get up-to-date information on flight status, delays, and gates
- **Watchlist**: Save and track your favorite flights
- **Responsive Design**: Beautiful UI that works on all devices
- **Smart Filtering**: Intelligent search with validation and helpful error messages

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔍 How to Use

### Search by Flight Number
1. Click the **"Flight Number"** tab
2. Enter a flight number (e.g., `AA123` or just `AA` for all American Airlines flights)
3. Click **"Search Flights"**

### Search by Route
1. Click the **"Route"** tab
2. Enter origin airport code (e.g., `JFK`, `LAX`, `ORD`)
3. Enter destination airport code (e.g., `MIA`, `DEN`, `ATL`)
4. You can search by origin only, destination only, or both
5. Click **"Search Flights"**

### View All Flights
- Click **"Show All Flights"** to see all available flights

### Manage Watchlist
- Click the **bookmark icon** on any flight card to add it to your watchlist
- Navigate to **"My Watchlist"** from the header to view saved flights
- Click the bookmark again to remove from watchlist

## 📁 Project Structure

```
flight-explorer/
├── src/
│   ├── api/              # API integration
│   ├── components/       # React components
│   ├── contexts/         # React context (state management)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # Business logic services
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── test-api.js          # API testing utility
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library

## 🔧 Recent Fixes

✅ Fixed search functionality not working  
✅ Removed duplicate files and cleaned up directory structure  
✅ Fixed type conflicts between different Flight interfaces  
✅ Improved API integration and error handling  
✅ Added comprehensive logging for debugging  

## 🧪 Testing the API

Run the API test script to verify connectivity:

```bash
node test-api.js
```

## 📝 API Information

- **Endpoint**: `https://flight-explorer-api.codewalnut.com/api/flights`
- **Fallback**: Local mock data at `/mock/flights.json`
- **Format**: Returns `{ flights: Flight[] }`

## 🐛 Debugging

Open browser DevTools (F12) and check the Console for detailed search logs:
- 🔍 Search parameters
- 📊 Flight counts
- ✅ Match results

## 📄 License

MIT License

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


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
