import Image from "next/image";

import styles from "./animatedHeader.module.css";
import ScrollAnimatedElement from "./ScrollAnimatedElement";

interface AnimatedHeaderProps {
  title: string;
  hasIcon?: boolean;
  iconColor?: "white" | "black";
  isAnimatingUnderline?: boolean;
  animatesOnce?: boolean;
  rootMargin?: string;
}

export default function AnimatedHeader({
  title,
  hasIcon = true,
  iconColor = "white",
  isAnimatingUnderline = false,
  animatesOnce = false,
  rootMargin="0px"
}: AnimatedHeaderProps) {
  if (isAnimatingUnderline) {
    return (
      <div className={styles.animated_header}>
        <div className={styles.header_title_wrapper}>
          <h2 className={!hasIcon ? styles.alt_header : ""}>
            {title}
          </h2>
          {hasIcon && (
            <Image
              src={`/refactor-icon-${iconColor}.svg`}
              alt="Refactor Games Logo Icon"
              width={32}
              height={32}
              className={styles.icon}
            />
          )}
        </div>
        <ScrollAnimatedElement
          once={animatesOnce}
          thresholdIn={1}
          customAnimationInClass="animate-header-underline"
        >
          <div className="header-underline" />
        </ScrollAnimatedElement>
      </div>
    );
  }

  return (
    <div className={styles.animated_header}>
      <div className={styles.header_title_wrapper}>
        <ScrollAnimatedElement directionIn="up" thresholdIn={1} rootMargin={rootMargin}>
          <h2 className={!hasIcon ? styles.alt_header : ""}>
            {title}
          </h2>
        </ScrollAnimatedElement>
        {hasIcon && (
          <ScrollAnimatedElement directionIn="up" thresholdIn={1} rootMargin={rootMargin}>
            <Image
              src={`/refactor-icon-${iconColor}.svg`}
              alt="Refactor Games Logo Icon"
              width={32}
              height={32}
              className={styles.icon}
            />
          </ScrollAnimatedElement>
        )}
      </div>
      <div className={styles.header_underline} />
    </div>
  );
}