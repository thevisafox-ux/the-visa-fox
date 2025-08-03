import { useState, useCallback } from 'react';
import CacheService, { CacheClearOptions } from '../services/cacheService';

interface UseCacheManagerReturn {
  clearAllCache: () => Promise<void>;
  clearSpecificCache: (type: keyof CacheClearOptions) => Promise<void>;
  clearCacheAndReload: () => Promise<void>;
  getCacheInfo: () => Promise<any>;
  isLoading: boolean;
  message: string;
  clearMessage: () => void;
}

export const useCacheManager = (): UseCacheManagerReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  const clearAllCache = useCallback(async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      await CacheService.clearCache({ all: true });
      setMessage('All cache cleared successfully!');
    } catch (error) {
      setMessage('Error clearing cache. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSpecificCache = useCallback(async (type: keyof CacheClearOptions) => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const options: CacheClearOptions = { [type]: true };
      await CacheService.clearCache(options);
      setMessage(`${type} cache cleared successfully!`);
    } catch (error) {
      setMessage(`Error clearing ${type} cache. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCacheAndReload = useCallback(async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      await CacheService.clearCacheAndReload({ all: true });
    } catch (error) {
      setMessage('Error clearing cache and reloading. Please try again.');
      setIsLoading(false);
    }
  }, []);

  const getCacheInfo = useCallback(async () => {
    try {
      return await CacheService.getCacheInfo();
    } catch (error) {
      console.error('Error getting cache info:', error);
      throw error;
    }
  }, []);

  return {
    clearAllCache,
    clearSpecificCache,
    clearCacheAndReload,
    getCacheInfo,
    isLoading,
    message,
    clearMessage
  };
}; 