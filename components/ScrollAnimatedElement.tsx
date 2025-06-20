"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./scrollAnimatedElement.module.css";

interface ScrollAnimatedElementProps {
  children: ReactNode;
  directionIn?: "up" | "down" | "left" | "right" | "";
  directionOut?: "up" | "down" | "left" | "right" | "";
  thresholdIn?: number;
  thresholdOut?: number;
  rootMargin?: string;
  once?: boolean; // Only animate in/out once
  // If you want additional classes for animation beyond standard directions
  // omit directionIn, and then your custom animation class name (must be global css)
  customAnimationInClass?: string;
  customAnimationOutClass?: string;
  globalClassName?: string; // Must be global css rule, not module.
}

/**
 * Triggers fade and slide animations based on scroll position using the IntersectionObserver API.
 *
 * It supports directional fade-in and fade-out animations (`up`, `down`, `left`, `right`),
 * or you can provide custom animation classes when more control is needed.
 *
 * @param {React.ReactNode} children - The content to animate on scroll.
 * @param {'up' | 'down' | 'left' | 'right'} [directionIn] - The direction the element animates in from.
 * @param {'up' | 'down' | 'left' | 'right'} [directionOut] - The direction the element animates out to when scrolling past the element's lower bounds.
 * @param {number} [thresholdValue] - The intersection ratio at which to trigger the fade-in animation.
 * @param {boolean} [once=false] - If true, the animation will only trigger once.
 * @param {string} [customAnimationInClass] - Optional. Use this when you want a custom animation class instead of the default directional ones.
 *                                                  To use this, omit `directionIn` and provide a globally defined class name.
 * @param {string} [customAnimationOutClass] - Optional. To use, omit `directionOut` and provide a globally defined class name.
 * @param {string} [globalClassName] - Optional. A global CSS class name to apply to the animated wrapper.
 *                                           This is useful when using CSS Modules, as animation classes (like `customAnimationInClass`) must be global.
 *
 * @remarks
 * - If you want to define custom scroll animations beyond the provided directions,
 *   omit `directionIn` and provide a `customAnimationInClass`.
 * - Any custom class name or `globalClassName` **must be defined globally**,
 *   since this component uses CSS Modules and won't recognize scoped styles in those fields.
 *
 * @example
 * ```tsx
 * <ScrollAnimatedElement directionIn="left" directionOut="right">
 *   <p>Hello, I animate in from the left and out to the right!</p>
 * </ScrollAnimatedElement>
 *
 * <ScrollAnimatedElement
 *   customAnimationInClass="fade-rotate-in"
 *   globalClassName="custom-parallax"
 * >
 *   <img src="/hero.png" alt="Parallax image" />
 * </ScrollAnimatedElement>
 * ```
 */
export default function ScrollAnimatedElement({
  children,
  directionIn,
  directionOut,
  thresholdIn = 0.25,
  thresholdOut = 0.25,
  rootMargin = "0px",
  once = false,
  customAnimationInClass = "",
  customAnimationOutClass = "",
  globalClassName = ""
}: ScrollAnimatedElementProps) {
  const animatedElementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOut, setIsOut] = useState(false);
  const hasScrollOutEffect = directionOut || customAnimationOutClass;

  useEffect(() => {
    const node = animatedElementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const bounding = entry.boundingClientRect;

        const elementTop = bounding.top;
        const elementHeight = bounding.height;

        // Calculate what percentage of the element has scrolled past the top of the viewport
        const scrolledPastTop = Math.max(0, -elementTop);
        const percentageScrolledOut = scrolledPastTop / elementHeight;
        const isScrollingOut = percentageScrolledOut >= thresholdOut;
        const isScrollingIn = ratio >= thresholdIn;

        if (hasScrollOutEffect && isScrollingOut) {
          setIsVisible(false);
          setIsOut(true);
          if (once) observer.disconnect();

        } else if (isScrollingIn) {
          setIsVisible(true);
          setIsOut(false);
          if (once && !hasScrollOutEffect) observer.disconnect();

        } else {
          setIsVisible(false);
          if (!once) setIsOut(false);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thresholdIn, thresholdOut, directionOut, once, hasScrollOutEffect]);

  const getDirectionClass = () => {
    if (!directionOut && isOut) return customAnimationOutClass;
    if (directionOut && isOut) return `${customAnimationOutClass} ${styles[`scroll_out_${directionOut}`]}`;
    if (isOut) return styles[`scroll_out_${directionOut}`];
    if (!directionIn && isVisible) return customAnimationInClass;
    if (directionIn && isVisible) return `${customAnimationInClass} ${styles[`scroll_in_${directionIn}`]}`;
    if (isVisible) return styles[`scroll_in_${directionIn}`];
    return styles[`scroll_start_${directionIn}`];
  }

  return (
    <div
      ref={animatedElementRef}
      className={`${getDirectionClass()} ${globalClassName} ${styles.scroll_element}`}
    >
      {children}
    </div>
  );
}