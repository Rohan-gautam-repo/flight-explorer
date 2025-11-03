import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './contexts/WatchlistContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { WatchlistPage } from './pages/WatchlistPage';

function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;
