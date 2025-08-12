'use client';
import { useState } from 'react';
import Loader from "@/components/Loader";

export default function LiminalNetwork() {
  const [status, setStatus] = useState('idle'); // idle, loading, response, error
  const [responseData, setResponseData] = useState(null);
  const [isAutoRetry, setIsAutoRetry] = useState(true);
  const [initiated, setInitiated] = useState(false);

  // Make a request to the liminal server
  const makeRequest = async (isRetry = false) => {
    // Set loading state
    setStatus('loading');
    setInitiated(true);
    if (!isRetry) {
      setResponseData(null);
    }

    // Create a unique endpoint to avoid caching
    const endpoint = `/liminal/${Date.now()}`;
    const SERVER_URL = 'http://localhost:3000'; // Server URL

    try {
      const response = await fetch(SERVER_URL + endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // Determine status class based on response code
      let statusClass = '';
      if (response.status >= 100 && response.status < 200) statusClass = 'information';
      else if (response.status >= 200 && response.status < 300) statusClass = 'success';
      else if (response.status >= 300 && response.status < 400) statusClass = 'redirection';
      else if (response.status >= 400) statusClass = 'error';

      // Parse and set the response data
      const data = await response.json();
      setResponseData(data);
      setStatus('response');

      // Console.log the response message instead of showing as error
      console.log(data.message);

      // Auto-retry if it's an error response and auto-retry is enabled
      if (isAutoRetry && (response.status >= 400 || response.status < 200 || (response.status >= 300 && response.status < 400))) {
        setTimeout(() => makeRequest(true), 2000);
      }
    } catch (error) {
      // Log the error message with console.log instead of console.error
      console.log(error.message);

      // Auto-retry on error if enabled
      if (isAutoRetry) {
        setTimeout(() => makeRequest(true), 2000);
      }
    }
  };

  return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="flex flex-col gap-4">
            {!initiated && (
                <button
                    onClick={() => makeRequest(false)}
                    disabled={status === 'loading' && !responseData}
                    className="px-4 py-2 border-black rounded-md font-mono text-sm bg-white text-black hover:bg-gray-100 transition duration-200 ease-in-out shadow-md"
                >
                  Initiate Connection Request
                </button>
            )}
          </div>

          {/* Loading spinner */}
          {status === 'loading' ? (
              <div className="mt-8">
                <Loader />
              </div>
          ) : (
              <div className="mt-8">
                <p className="text-sm font-mono text-black p-4">
                  trying again...
                </p>
              </div>
          )}
        </div>
      </div>
  );
}