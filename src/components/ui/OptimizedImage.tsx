'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  showFallbackOnError?: boolean;
}

/**
 * OptimizedImage component with error handling and fallback support
 * Wraps Next.js Image component with additional features:
 * - Automatic fallback to placeholder on error
 * - Blur placeholder support
 * - Lazy loading by default
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/project-placeholder.svg',
  showFallbackOnError = true,
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (showFallbackOnError && !hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Generate a simple blur data URL if not provided and placeholder is blur
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // For SVG images, don't use blur placeholder
    if (typeof imgSrc === 'string' && imgSrc.endsWith('.svg')) {
      return undefined;
    }
    
    // Simple 10x10 gray blur placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+';
  };

  const finalPlaceholder = typeof imgSrc === 'string' && imgSrc.endsWith('.svg') 
    ? 'empty' 
    : placeholder;

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      loading={loading}
      placeholder={finalPlaceholder}
      blurDataURL={finalPlaceholder === 'blur' ? getBlurDataURL() : undefined}
      onError={handleError}
    />
  );
};
