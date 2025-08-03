import React from 'react';
import CacheManager from '../components/CacheManager';

const CacheManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cache Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage browser cache, localStorage, sessionStorage, cookies, and service worker cache. 
            This tool helps you clear various types of browser data without manually accessing browser settings.
          </p>
        </div>
        
        <CacheManager />
        
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Why Clear Cache?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Common Issues:</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Website not loading latest content</li>
                <li>• Forms not working properly</li>
                <li>• Stale data being displayed</li>
                <li>• Authentication issues</li>
                <li>• Service worker conflicts</li>
                <li>• Outdated cached resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Fresh start with clean data</li>
                <li>• Resolves loading issues</li>
                <li>• Ensures latest content</li>
                <li>• Fixes authentication problems</li>
                <li>• Removes corrupted cache</li>
                <li>• Improves performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacheManagement; 