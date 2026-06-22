import { useState, useEffect, useCallback } from 'react';
import type { DesignSnapshot } from '../components/social-media-kit/types';

const STORAGE_KEY = 'cove_design_history_v3';
const MAX_HISTORY = 3;

export function useDesignHistory() {
  const [history, setHistory] = useState<DesignSnapshot[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load design history:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save a new snapshot
  const saveSnapshot = useCallback((snapshot: Omit<DesignSnapshot, 'id' | 'timestamp' | 'name'>) => {
    const timeStr = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    
    const newSnapshot: DesignSnapshot = {
      ...snapshot,
      id: `snap-${Date.now()}`,
      timestamp: timeStr,
      name: `Design Snapshot (${timeStr})`,
    };

    setHistory((prev) => {
      // Filter out duplicates based on key properties
      const filtered = prev.filter(
        item => 
          item.title !== newSnapshot.title || 
          item.stickerType !== newSnapshot.stickerType || 
          item.bgColor !== newSnapshot.bgColor
      );
      const updated = [newSnapshot, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    return newSnapshot;
  }, []);

  // Load a snapshot's data (caller applies to their state)
  const loadSnapshot = useCallback((snapshot: DesignSnapshot) => {
    return snapshot;
  }, []);

  // Remove a snapshot
  const removeSnapshot = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    history,
    isLoaded,
    saveSnapshot,
    loadSnapshot,
    removeSnapshot,
    clearHistory,
  };
}

export default useDesignHistory;
