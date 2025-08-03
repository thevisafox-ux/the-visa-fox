/**
 * Simple cache utility functions
 * Easy to use functions for clearing cache from anywhere in the application
 */

/**
 * Clear all cache with a simple function call
 */
export const clearAllCache = async (): Promise<void> => {
  try {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear cookies
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    
    // Clear service worker cache
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of registrations) {
        await registration.unregister();
      }
    }
    
    // Clear cache storage
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      for (let cacheName of cacheNames) {
        await caches.delete(cacheName);
      }
    }
    
    console.log('All cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Clear only localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
    console.log('localStorage cleared');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Clear only sessionStorage
 */
export const clearSessionStorage = (): void => {
  try {
    sessionStorage.clear();
    console.log('sessionStorage cleared');
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
};

/**
 * Clear only cookies
 */
export const clearCookies = (): void => {
  try {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    console.log('Cookies cleared');
  } catch (error) {
    console.error('Error clearing cookies:', error);
  }
};

/**
 * Clear cache and reload the page
 */
export const clearCacheAndReload = async (): Promise<void> => {
  try {
    await clearAllCache();
    setTimeout(() => {
      window.location.reload(true);
    }, 100);
  } catch (error) {
    console.error('Error clearing cache and reloading:', error);
  }
};

/**
 * Get cache information
 */
export const getCacheInfo = () => {
  try {
    const localStorageSize = Object.keys(localStorage).length;
    const sessionStorageSize = Object.keys(sessionStorage).length;
    const cookiesCount = document.cookie.split(';').filter(cookie => cookie.trim() !== '').length;
    
    return {
      localStorageSize,
      sessionStorageSize,
      cookiesCount
    };
  } catch (error) {
    console.error('Error getting cache info:', error);
    return {
      localStorageSize: 0,
      sessionStorageSize: 0,
      cookiesCount: 0
    };
  }
};

/**
 * Check if cache is empty
 */
export const isCacheEmpty = (): boolean => {
  const info = getCacheInfo();
  return info.localStorageSize === 0 && info.sessionStorageSize === 0 && info.cookiesCount === 0;
};

/**
 * Clear specific item from localStorage
 */
export const clearLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
    console.log(`localStorage item '${key}' cleared`);
  } catch (error) {
    console.error(`Error clearing localStorage item '${key}':`, error);
  }
};

/**
 * Clear specific cookie
 */
export const clearCookie = (name: string): void => {
  try {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    console.log(`Cookie '${name}' cleared`);
  } catch (error) {
    console.error(`Error clearing cookie '${name}':`, error);
  }
}; 