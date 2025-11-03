import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Flight } from '../types/flight';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface WatchlistContextType {
  watchlist: Flight[];
  addToWatchlist: (flight: Flight) => void;
  removeFromWatchlist: (flightId: string) => void;
  isInWatchlist: (flightId: string) => boolean;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useLocalStorage<Flight[]>('flight-watchlist', []);

  const addToWatchlist = (flight: Flight) => {
    setWatchlist((prev) => {
      // Avoid duplicates
      if (prev.find((f) => f.id === flight.id)) {
        return prev;
      }
      return [...prev, flight];
    });
  };

  const removeFromWatchlist = (flightId: string) => {
    setWatchlist((prev) => prev.filter((f) => f.id !== flightId));
  };

  const isInWatchlist = (flightId: string) => {
    return watchlist.some((f) => f.id === flightId);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, clearWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
}
