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
        return 'bg-green-100 text-green-700';
      case 'Delayed':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {flight.airlineCode}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {flight.airline} {flight.flightNumber}
                </h2>
                <p className="text-sm text-gray-500">Flight Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <FiInfo className="w-5 h-5" />
                <span className="font-medium">Status</span>
              </div>
              <Badge className={getStatusColor(flight.status)}>{flight.status}</Badge>
            </div>

            {/* Route */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">From</div>
                  <div className="text-3xl font-bold text-gray-900">{flight.origin}</div>
                  <div className="text-sm text-gray-600">{flight.originCity}</div>
                </div>
                <div className="flex-shrink-0 px-6">
                  <FiMapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm text-gray-500 mb-1">To</div>
                  <div className="text-3xl font-bold text-gray-900">{flight.destination}</div>
                  <div className="text-sm text-gray-600">{flight.destinationCity}</div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
                Duration: <span className="font-semibold">{flight.duration}</span>
              </div>
            </div>

            {/* Departure Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-700 mb-3">
                  <FiClock className="w-5 h-5" />
                  <span className="font-semibold">Departure</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-gray-600">Scheduled</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatDateTime(flight.scheduledDeparture)}
                    </div>
                  </div>
                  {flight.estimatedDeparture && flight.estimatedDeparture !== flight.scheduledDeparture && (
                    <div>
                      <div className="text-gray-600">Estimated</div>
                      <div className="text-lg font-semibold text-yellow-700">
                        {formatDateTime(flight.estimatedDeparture)}
                      </div>
                    </div>
                  )}
                  {flight.actualDeparture && (
                    <div>
                      <div className="text-gray-600">Actual</div>
                      <div className="text-lg font-semibold text-green-700">
                        {formatDateTime(flight.actualDeparture)}
                      </div>
                    </div>
                  )}
                  {flight.terminal && (
                    <div className="pt-2 border-t border-blue-100">
                      <span className="text-gray-600">Terminal:</span>{' '}
                      <span className="font-semibold text-gray-900">{flight.terminal}</span>
                      {flight.gate && (
                        <>
                          {' • '}
                          <span className="text-gray-600">Gate:</span>{' '}
                          <span className="font-semibold text-gray-900">{flight.gate}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Arrival Info */}
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-700 mb-3">
                  <FiClock className="w-5 h-5" />
                  <span className="font-semibold">Arrival</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-gray-600">Scheduled</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatDateTime(flight.scheduledArrival)}
                    </div>
                  </div>
                  {flight.estimatedArrival && flight.estimatedArrival !== flight.scheduledArrival && (
                    <div>
                      <div className="text-gray-600">Estimated</div>
                      <div className="text-lg font-semibold text-yellow-700">
                        {formatDateTime(flight.estimatedArrival)}
                      </div>
                    </div>
                  )}
                  {flight.actualArrival && (
                    <div>
                      <div className="text-gray-600">Actual</div>
                      <div className="text-lg font-semibold text-green-700">
                        {formatDateTime(flight.actualArrival)}
                      </div>
                    </div>
                  )}
                  {flight.arrivalTerminal && (
                    <div className="pt-2 border-t border-green-100">
                      <span className="text-gray-600">Terminal:</span>{' '}
                      <span className="font-semibold text-gray-900">{flight.arrivalTerminal}</span>
                      {flight.arrivalGate && (
                        <>
                          {' • '}
                          <span className="text-gray-600">Gate:</span>{' '}
                          <span className="font-semibold text-gray-900">{flight.arrivalGate}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Aircraft & Delay Info */}
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Aircraft</span>
                  <span className="font-semibold text-gray-900">{flight.aircraft}</span>
                </div>
              </div>
              
              {flight.delayMinutes !== undefined && flight.delayMinutes !== 0 && (
                <div className={`rounded-xl p-4 ${
                  flight.delayMinutes > 0 
                    ? 'bg-yellow-50 border border-yellow-200' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      flight.delayMinutes > 0 ? 'text-yellow-700' : 'text-green-700'
                    }`} />
                    <div className="flex-1">
                      <div className={`font-semibold mb-1 ${
                        flight.delayMinutes > 0 ? 'text-yellow-900' : 'text-green-900'
                      }`}>
                        {flight.delayMinutes > 0 ? 'Flight Delayed' : 'Early Arrival'}
                      </div>
                      <div className={`text-sm ${
                        flight.delayMinutes > 0 ? 'text-yellow-800' : 'text-green-800'
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
