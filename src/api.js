import mockData from './mock-data';

/**
 * Extract unique locations from the events array.
 * @param {Array} events - Array of event objects.
 * @returns {Array} Array of unique locations.
 */
export const extractLocations = (events) => {
  const locations = events.map((event) => event.location);
  return [...new Set(locations)];
};

/**
 * Fetch the list of all events.
 * Currently returns mock data for testing.
 * @returns {Promise<Array>} Array of mock events.
 */
export const getEvents = async () => {
  return mockData;
};
