import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(200px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AnimatedComponent = styled.div<{ $isVisible: boolean }>`
  opacity: 0;
  transform: translateY(200px);
  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${slideIn} 1s ease-out forwards;
    `}
`;

const withScrollAnimation = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const ScrollAnimationComponent = (props: P) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px 100px 0px',
        },
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);

    return (
      <AnimatedComponent ref={ref} $isVisible={isVisible}>
        <WrappedComponent {...props} />
      </AnimatedComponent>
    );
  };

  return ScrollAnimationComponent;
};

export default withScrollAnimation;
