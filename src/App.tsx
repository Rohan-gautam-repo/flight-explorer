import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './contexts/WatchlistContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { WatchlistPage } from './pages/WatchlistPage';

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;
