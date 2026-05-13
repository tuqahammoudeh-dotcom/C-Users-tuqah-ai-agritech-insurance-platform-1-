/**
 * Utility for making API calls to ngrok-proxied backends
 * to avoid the browser warning page.
 */
export async function secureFetch(url: string, options: RequestInit = {}) {
  const headers = {
    ...options.headers,
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
