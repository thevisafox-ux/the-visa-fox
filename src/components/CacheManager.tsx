import React, { useState, useEffect } from 'react';
import CacheService, { CacheClearOptions } from '../services/cacheService';

interface CacheInfo {
  localStorageSize: number;
  sessionStorageSize: number;
  cookiesCount: number;
  cacheNames: string[];
}

const CacheManager: React.FC = () => {
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    loadCacheInfo();
  }, []);

  const loadCacheInfo = async () => {
    try {
      const info = await CacheService.getCacheInfo();
      setCacheInfo(info);
    } catch (error) {
      console.error('Error loading cache info:', error);
    }
  };

  const handleClearCache = async (options: CacheClearOptions) => {
    setIsLoading(true);
    setMessage('');
    
    try {
      await CacheService.clearCache(options);
      setMessage('Cache cleared successfully!');
      await loadCacheInfo(); // Refresh cache info
    } catch (error) {
      setMessage('Error clearing cache. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAllCache = () => {
    handleClearCache({ all: true });
  };

  const handleClearSpecificCache = (type: keyof CacheClearOptions) => {
    const options: CacheClearOptions = { [type]: true };
    handleClearCache(options);
  };

  const handleClearCacheAndReload = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      await CacheService.clearCacheAndReload({ all: true });
    } catch (error) {
      setMessage('Error clearing cache and reloading. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cache Manager</h2>
      
      {/* Cache Information */}
      {cacheInfo && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Cache Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{cacheInfo.localStorageSize}</div>
              <div className="text-sm text-gray-600">localStorage Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{cacheInfo.sessionStorageSize}</div>
              <div className="text-sm text-gray-600">sessionStorage Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{cacheInfo.cookiesCount}</div>
              <div className="text-sm text-gray-600">Cookies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{cacheInfo.cacheNames.length}</div>
              <div className="text-sm text-gray-600">Cache Storage</div>
            </div>
          </div>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.includes('Error') 
            ? 'bg-red-100 text-red-700 border border-red-200' 
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          {message}
        </div>
      )}

      {/* Cache Control Buttons */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Clear All Cache */}
          <button
            onClick={handleClearAllCache}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All Cache
              </>
            )}
          </button>

          {/* Clear localStorage */}
          <button
            onClick={() => handleClearSpecificCache('localStorage')}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Clear localStorage
          </button>

          {/* Clear sessionStorage */}
          <button
            onClick={() => handleClearSpecificCache('sessionStorage')}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Clear sessionStorage
          </button>

          {/* Clear Cookies */}
          <button
            onClick={() => handleClearSpecificCache('cookies')}
            disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Clear Cookies
          </button>

          {/* Clear Service Worker */}
          <button
            onClick={() => handleClearSpecificCache('serviceWorker')}
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Clear Service Worker
          </button>

          {/* Clear Cache Storage */}
          <button
            onClick={() => handleClearSpecificCache('cacheStorage')}
            disabled={isLoading}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Clear Cache Storage
          </button>
        </div>

        {/* Clear Cache and Reload */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleClearCacheAndReload}
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear Cache & Reload Page
              </>
            )}
          </button>
        </div>

        {/* Refresh Cache Info */}
        <div className="text-center">
          <button
            onClick={loadCacheInfo}
            disabled={isLoading}
            className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Refresh Cache Information
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Instructions:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Clear All Cache:</strong> Removes all types of browser cache</li>
          <li>• <strong>Clear localStorage:</strong> Removes data stored in browser's localStorage</li>
          <li>• <strong>Clear sessionStorage:</strong> Removes data stored in browser's sessionStorage</li>
          <li>• <strong>Clear Cookies:</strong> Removes all cookies for this website</li>
          <li>• <strong>Clear Service Worker:</strong> Unregisters and clears service worker cache</li>
          <li>• <strong>Clear Cache Storage:</strong> Removes cached files and resources</li>
          <li>• <strong>Clear Cache & Reload:</strong> Clears all cache and refreshes the page</li>
        </ul>
      </div>
    </div>
  );
};

export default CacheManager; 