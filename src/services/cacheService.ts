/**
 * Cache Management Service
 * Provides functions to clear various types of browser cache
 */

export interface CacheClearOptions {
  localStorage?: boolean;
  sessionStorage?: boolean;
  cookies?: boolean;
  serviceWorker?: boolean;
  cacheStorage?: boolean;
  all?: boolean;
}

export class CacheService {
  /**
   * Clear all or specific types of cache
   */
  static async clearCache(options: CacheClearOptions = { all: true }): Promise<void> {
    try {
      if (options.all || options.localStorage) {
        this.clearLocalStorage();
      }

      if (options.all || options.sessionStorage) {
        this.clearSessionStorage();
      }

      if (options.all || options.cookies) {
        this.clearCookies();
      }

      if (options.all || options.serviceWorker) {
        await this.clearServiceWorkerCache();
      }

      if (options.all || options.cacheStorage) {
        await this.clearCacheStorage();
      }

      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  }

  /**
   * Clear localStorage
   */
  static clearLocalStorage(): void {
    try {
      localStorage.clear();
      console.log('localStorage cleared');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Clear sessionStorage
   */
  static clearSessionStorage(): void {
    try {
      sessionStorage.clear();
      console.log('sessionStorage cleared');
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }

  /**
   * Clear all cookies
   */
  static clearCookies(): void {
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
  }

  /**
   * Clear specific cookie by name
   */
  static clearCookie(name: string): void {
    try {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      console.log(`Cookie '${name}' cleared`);
    } catch (error) {
      console.error(`Error clearing cookie '${name}':`, error);
    }
  }

  /**
   * Clear service worker cache
   */
  static async clearServiceWorkerCache(): Promise<void> {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        
        for (let registration of registrations) {
          await registration.unregister();
        }
        
        console.log('Service worker cache cleared');
      }
    } catch (error) {
      console.error('Error clearing service worker cache:', error);
    }
  }

  /**
   * Clear Cache Storage API
   */
  static async clearCacheStorage(): Promise<void> {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        
        for (let cacheName of cacheNames) {
          await caches.delete(cacheName);
        }
        
        console.log('Cache Storage cleared');
      }
    } catch (error) {
      console.error('Error clearing cache storage:', error);
    }
  }

  /**
   * Clear specific cache by name
   */
  static async clearSpecificCache(cacheName: string): Promise<void> {
    try {
      if ('caches' in window) {
        await caches.delete(cacheName);
        console.log(`Cache '${cacheName}' cleared`);
      }
    } catch (error) {
      console.error(`Error clearing cache '${cacheName}':`, error);
    }
  }

  /**
   * Get cache information
   */
  static async getCacheInfo(): Promise<{
    localStorageSize: number;
    sessionStorageSize: number;
    cookiesCount: number;
    cacheNames: string[];
  }> {
    try {
      const localStorageSize = Object.keys(localStorage).length;
      const sessionStorageSize = Object.keys(sessionStorage).length;
      const cookiesCount = document.cookie.split(';').filter(cookie => cookie.trim() !== '').length;
      
      let cacheNames: string[] = [];
      if ('caches' in window) {
        cacheNames = await caches.keys();
      }

      return {
        localStorageSize,
        sessionStorageSize,
        cookiesCount,
        cacheNames
      };
    } catch (error) {
      console.error('Error getting cache info:', error);
      throw error;
    }
  }

  /**
   * Clear cache for specific domain/path
   */
  static async clearCacheForPath(path: string): Promise<void> {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        
        for (let cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const requests = await cache.keys();
          
          for (let request of requests) {
            if (request.url.includes(path)) {
              await cache.delete(request);
            }
          }
        }
        
        console.log(`Cache cleared for path: ${path}`);
      }
    } catch (error) {
      console.error(`Error clearing cache for path '${path}':`, error);
    }
  }

  /**
   * Force browser to reload without cache
   */
  static forceReload(): void {
    try {
      window.location.reload(true);
    } catch (error) {
      console.error('Error forcing reload:', error);
    }
  }

  /**
   * Clear cache and reload page
   */
  static async clearCacheAndReload(options: CacheClearOptions = { all: true }): Promise<void> {
    try {
      await this.clearCache(options);
      setTimeout(() => {
        this.forceReload();
      }, 100);
    } catch (error) {
      console.error('Error clearing cache and reloading:', error);
    }
  }
}

// Export default instance for easy import
export default CacheService; 