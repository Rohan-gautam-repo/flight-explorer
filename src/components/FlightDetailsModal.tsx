import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiClock, FiInfo, FiAlertCircle } from 'react-icons/fi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import type { Flight } from '../types/flight';
import { Badge } from './shared/Badge';

// Extend dayjs with timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

interface FlightDetailsModalProps {
  flight: Flight;
  onClose: () => void;
}

export function FlightDetailsModal({ flight, onClose }: FlightDetailsModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time':
      case 'Boarding':
      case 'Departed':
      case 'Landed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Delayed':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  // Format date and time with better readability
  const formatDateTime = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY [at] HH:mm');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                {flight.airlineCode}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {flight.airline} {flight.flightNumber}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Flight Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiInfo className="w-5 h-5" />
                <span className="font-medium">Status</span>
              </div>
              <Badge className={getStatusColor(flight.status)}>{flight.status}</Badge>
            </div>

            {/* Route */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">From</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{flight.origin}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{flight.originCity}</div>
                </div>
                <div className="flex-shrink-0 px-6">
                  <FiMapPin className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">To</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{flight.destination}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{flight.destinationCity}</div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                Duration: <span className="font-semibold">{flight.duration}</span>
              </div>
            </div>

            {/* Departure Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-3">
                  <FiClock className="w-5 h-5" />
                  <span className="font-semibold">Departure</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Scheduled</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDateTime(flight.scheduledDeparture)}
                    </div>
                  </div>
                  {flight.estimatedDeparture && flight.estimatedDeparture !== flight.scheduledDeparture && (
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Estimated</div>
                      <div className="text-lg font-semibold text-yellow-700 dark:text-yellow-400">
                        {formatDateTime(flight.estimatedDeparture)}
                      </div>
                    </div>
                  )}
                  {flight.actualDeparture && (
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Actual</div>
                      <div className="text-lg font-semibold text-green-700 dark:text-green-400">
                        {formatDateTime(flight.actualDeparture)}
                      </div>
                    </div>
                  )}
                  {flight.terminal && (
                    <div className="pt-2 border-t border-blue-100 dark:border-blue-800">
                      <span className="text-gray-600 dark:text-gray-400">Terminal:</span>{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">{flight.terminal}</span>
                      {flight.gate && (
                        <>
                          {' • '}
                          <span className="text-gray-600 dark:text-gray-400">Gate:</span>{' '}
                          <span className="font-semibold text-gray-900 dark:text-white">{flight.gate}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Arrival Info */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-3">
                  <FiClock className="w-5 h-5" />
                  <span className="font-semibold">Arrival</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Scheduled</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDateTime(flight.scheduledArrival)}
                    </div>
                  </div>
                  {flight.estimatedArrival && flight.estimatedArrival !== flight.scheduledArrival && (
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Estimated</div>
                      <div className="text-lg font-semibold text-yellow-700 dark:text-yellow-400">
                        {formatDateTime(flight.estimatedArrival)}
                      </div>
                    </div>
                  )}
                  {flight.actualArrival && (
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Actual</div>
                      <div className="text-lg font-semibold text-green-700 dark:text-green-400">
                        {formatDateTime(flight.actualArrival)}
                      </div>
                    </div>
                  )}
                  {flight.arrivalTerminal && (
                    <div className="pt-2 border-t border-green-100 dark:border-green-800">
                      <span className="text-gray-600 dark:text-gray-400">Terminal:</span>{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">{flight.arrivalTerminal}</span>
                      {flight.arrivalGate && (
                        <>
                          {' • '}
                          <span className="text-gray-600 dark:text-gray-400">Gate:</span>{' '}
                          <span className="font-semibold text-gray-900 dark:text-white">{flight.arrivalGate}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Aircraft & Delay Info */}
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Aircraft</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{flight.aircraft}</span>
                </div>
              </div>
              
              {flight.delayMinutes !== undefined && flight.delayMinutes !== 0 && (
                <div className={`rounded-xl p-4 ${
                  flight.delayMinutes > 0 
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700' 
                    : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                }`}>
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      flight.delayMinutes > 0 ? 'text-yellow-700 dark:text-yellow-400' : 'text-green-700 dark:text-green-400'
                    }`} />
                    <div className="flex-1">
                      <div className={`font-semibold mb-1 ${
                        flight.delayMinutes > 0 ? 'text-yellow-900 dark:text-yellow-300' : 'text-green-900 dark:text-green-300'
                      }`}>
                        {flight.delayMinutes > 0 ? 'Flight Delayed' : 'Early Arrival'}
                      </div>
                      <div className={`text-sm ${
                        flight.delayMinutes > 0 ? 'text-yellow-800 dark:text-yellow-400' : 'text-green-800 dark:text-green-400'
                      }`}>
                        {flight.delayMinutes > 0 
                          ? `This flight is delayed by ${flight.delayMinutes} minutes`
                          : `This flight arrived ${Math.abs(flight.delayMinutes)} minutes early`
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
