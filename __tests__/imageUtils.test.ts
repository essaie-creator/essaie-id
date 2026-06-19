import { describe, it, expect } from 'vitest';
import { getContrastRatio, meetsWcagAA, getGraphicDimensions } from '../src/utils/imageUtils';

describe('imageUtils', () => {
  describe('getContrastRatio', () => {
    it('should calculate contrast ratio between black and white', () => {
      const ratio = getContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBeGreaterThan(20); // Black and white have maximum contrast
    });

    it('should calculate contrast ratio between similar colors', () => {
      const ratio = getContrastRatio('#FAF6F0', '#FFFFFF');
      expect(ratio).toBeLessThan(2); // Similar light colors have low contrast
    });

    it('should handle Cove brand colors', () => {
      const ratio = getContrastRatio('#FF6B4A', '#1C1917');
      expect(ratio).toBeGreaterThan(4.5); // Should meet WCAG AA for normal text
    });
  });

  describe('meetsWcagAA', () => {
    it('should return true for high contrast combinations', () => {
      expect(meetsWcagAA('#1C1917', '#FFFFFF')).toBe(true);
      expect(meetsWcagAA('#FFFFFF', '#1C1917')).toBe(true);
    });

    it('should return false for low contrast combinations', () => {
      expect(meetsWcagAA('#FAF6F0', '#FFFFFF')).toBe(false);
    });

    it('should use lower threshold for large text', () => {
      // Large text requires 3.0:1, normal text requires 4.5:1
      // This combination passes for large text but might fail for normal text
      const ratio = getContrastRatio('#FF6B4A', '#FFFFFF');
      const passesLargeText = meetsWcagAA('#FF6B4A', '#FFFFFF', true);
      const passesNormalText = meetsWcagAA('#FF6B4A', '#FFFFFF', false);
      
      if (ratio >= 3.0) {
        expect(passesLargeText).toBe(true);
      }
      if (ratio < 4.5) {
        expect(passesNormalText).toBe(false);
      }
    });
  });

  describe('getGraphicDimensions', () => {
    it('should return YouTube HD dimensions for thumbnail', () => {
      const dims = getGraphicDimensions('thumbnail');
      expect(dims.width).toBe(1280);
      expect(dims.height).toBe(720);
      expect(dims.label).toContain('YouTube HD');
    });

    it('should return banner dimensions', () => {
      const dims = getGraphicDimensions('banner');
      expect(dims.width).toBe(1200);
      expect(dims.height).toBe(400);
      expect(dims.label).toContain('Profile Banner');
    });

    it('should return avatar dimensions', () => {
      const dims = getGraphicDimensions('avatar');
      expect(dims.width).toBe(500);
      expect(dims.height).toBe(500);
      expect(dims.label).toContain('Profile Avatar');
    });
  });
});
