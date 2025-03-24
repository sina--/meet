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
 * Check if an access token is valid.
 * @param {string} accessToken - The access token to validate
 * @returns {Promise<Object>} The token info or error
 */
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

/**
 * Remove query parameters from the URL
 */
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

/**
 * Get an access token using the authorization code
 * @param {string} code - The authorization code
 * @returns {Promise<string>} The access token
 */
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://ir4l8yxtpf.execute-api.us-west-2.amazonaws.com/dev/api/token' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);
  return access_token;
};

/**
 * Get the access token for API requests
 * @returns {Promise<string>} The access token
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");

    if (!code) {
      const response = await fetch(
        "https://ir4l8yxtpf.execute-api.us-west-2.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

/**
 * Fetch the list of all events.
 * @returns {Promise<Array>} Array of events.
 */
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  // Check if the user is offline
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();
  if (token) {
    removeQuery();
    const url = "https://ir4l8yxtpf.execute-api.us-west-2.amazonaws.com/dev/api/get-events" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      // Store events in localStorage for offline access
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    } else return null;
  }
};
