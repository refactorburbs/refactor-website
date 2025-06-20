"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface ScrollData {
  // Element's position relative to viewport
  elementTop: number;
  elementBottom: number;
  elementHeight: number;
  elementCenterY: number;

  // Viewport info
  viewportHeight: number;

  // Scroll progress values (0 to 1)
  // Progress as element moves through viewport (0 = top enters, 1 = bottom exits)
  progressThroughViewport: number;

  // Progress as element scrolls from bottom of viewport to top (0 = bottom, 1 = top)
  progressBottomToTop: number;

  // Raw scroll position
  scrollY: number;

  // Visibility state
  isInViewport: boolean;
  isAboveViewport: boolean;
  isBelowViewport: boolean;

  // Percentage of element visible (0 to 1)
  visibilityRatio: number;
}

interface UseScrollParallaxOptions {
  // Optional performance optimization - only update when element is near viewport
  enableViewportCheck?: boolean;
  // Offset from viewport edges to start tracking (when enableViewportCheck is true)
  viewportOffset?: number;
  // Throttle scroll events (ms) - 0 means no throttling
  throttleMs?: number;
}

/**
 * Hook that provides real-time scroll position data for creating smooth parallax effects
 *
 * @param options - Configuration options
 * @returns [ref, scrollData] - Ref to attach to element and current scroll data
 */
export function useScrollParallax(options: UseScrollParallaxOptions = {}) {
  const {
    enableViewportCheck = true,
    viewportOffset = 500,
    throttleMs = 16
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [scrollData, setScrollData] = useState<ScrollData>({
    elementTop: 0,
    elementBottom: 0,
    elementHeight: 0,
    elementCenterY: 0,
    viewportHeight: 0,
    progressThroughViewport: 0,
    progressBottomToTop: 0,
    scrollY: 0,
    isInViewport: false,
    isAboveViewport: false,
    isBelowViewport: true,
    visibilityRatio: 0
  });

  const calculateScrollData = useCallback((): ScrollData | null => {
    const element = elementRef.current;
    if (!element) return null;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const elementHeight = rect.height;
    const elementCenterY = elementTop + elementHeight / 2;

    // Visibility calculations
    const isInViewport = elementBottom > 0 && elementTop < viewportHeight;
    const isAboveViewport = elementBottom <= 0;
    const isBelowViewport = elementTop >= viewportHeight;

    // Calculate how much of the element is visible
    const visibleTop = Math.max(0, Math.min(elementTop, viewportHeight));
    const visibleBottom = Math.max(0, Math.min(elementBottom, viewportHeight));
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibilityRatio = elementHeight > 0 ? visibleHeight / elementHeight : 0;

    // Progress through viewport (0 when element top enters bottom of viewport, 1 when element bottom exits top)
    const totalScrollDistance = viewportHeight + elementHeight;
    const scrollProgress = (viewportHeight - elementTop) / totalScrollDistance;
    const progressThroughViewport = Math.max(0, Math.min(1, scrollProgress));

    // Progress from bottom to top of viewport (0 = element at bottom, 1 = element at top)
    const progressBottomToTop = Math.max(0, Math.min(1, (viewportHeight - elementBottom) / viewportHeight));

    return {
      elementTop,
      elementBottom,
      elementHeight,
      elementCenterY,
      viewportHeight,
      progressThroughViewport,
      progressBottomToTop,
      scrollY,
      isInViewport,
      isAboveViewport,
      isBelowViewport,
      visibilityRatio
    };
  }, []);

  const throttledScrollHandler = useCallback(() => {
    const newScrollData = calculateScrollData();
    if (!newScrollData) return;

    // Performance optimization: only update if element is near viewport
    if (enableViewportCheck) {
      const { elementTop, elementBottom, viewportHeight } = newScrollData;
      const isNearViewport =
        elementBottom > -viewportOffset &&
        elementTop < viewportHeight + viewportOffset;

      if (!isNearViewport) return;
    }

    setScrollData(newScrollData);
  }, [calculateScrollData, enableViewportCheck, viewportOffset]);

  // Throttle mechanism
  const throttleRef = useRef<NodeJS.Timeout>(undefined);
  const handleScroll = useCallback(() => {
    if (throttleMs <= 0) {
      throttledScrollHandler();
      return;
    }

    if (throttleRef.current) return;

    throttleRef.current = setTimeout(() => {
      throttledScrollHandler();
      throttleRef.current = undefined;
    }, throttleMs);
  }, [throttledScrollHandler, throttleMs]);

  useEffect(() => {
    // Initial calculation
    const initialData = calculateScrollData();
    if (initialData) {
      setScrollData(initialData);
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, [handleScroll, calculateScrollData]);

  return [elementRef, scrollData] as const;
}