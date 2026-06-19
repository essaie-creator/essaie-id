/**
 * Utility functions for canvas and image operations
 */

export interface Dimensions {
  width: number;
  height: number;
}

export type GraphicType = 'thumbnail' | 'banner' | 'avatar';

/**
 * Get dimensions for different graphic types
 */
export function getGraphicDimensions(type: GraphicType): Dimensions & { label: string } {
  switch (type) {
    case 'thumbnail':
      return { width: 1280, height: 720, label: '1280 x 720 (YouTube HD)' };
    case 'banner':
      return { width: 1200, height: 400, label: '1200 x 400 (Profile Banner)' };
    case 'avatar':
      return { width: 500, height: 500, label: '500 x 500 (Profile Avatar / Stamp)' };
    default:
      return { width: 500, height: 500, label: '500 x 500 (Default)' };
  }
}

/**
 * Convert SVG to PNG using canvas
 */
export async function svgToPng(
  svgElement: SVGSVGElement,
  format: 'png' | 'svg' = 'png'
): Promise<Blob> {
  const svgString = new XMLSerializer().serializeToString(svgElement);

  if (format === 'svg') {
    return new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svgElement.width.baseVal.value;
      canvas.height = svgElement.height.baseVal.value;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create PNG blob'));
        }
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG image'));
    };

    img.src = url;
  });
}

/**
 * Trigger download of a blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Calculate contrast ratio for accessibility
 * Based on WCAG 2.0 formula
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Get relative luminance of a color
 */
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val /= 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Check if contrast ratio meets WCAG AA standards
 */
export function meetsWcagAA(color1: string, color2: string, largeText = false): boolean {
  const ratio = getContrastRatio(color1, color2);
  return largeText ? ratio >= 3.0 : ratio >= 4.5;
}
