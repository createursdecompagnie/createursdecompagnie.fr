import React, { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  format?: (value: number) => string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1500,
  format = (v) => v.toFixed(0),
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = displayValue;
    const change = value - startValue;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + change * eased);

      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => animationRef.current && cancelAnimationFrame(animationRef.current);
  }, [value, duration]);

  return <>{format(displayValue)}</>;
};
