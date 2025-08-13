import React, { useEffect, useState } from 'react';
import './GradientBackground.css';

const GradientBackground = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let animationId;
    
    const initializeGradient = () => {
      try {
        const canvas = document.querySelector('.gradient-background');
        if (!canvas) {
          // Wait for DOM to be ready
          requestAnimationFrame(initializeGradient);
          return;
        }

        // Set loaded state after a brief delay to prevent flicker
        setTimeout(() => {
          setIsLoaded(true);
        }, 100);

        // Your existing gradient logic here...
        // (Add your gradient animation code)
        
      } catch (error) {
        console.error("Gradient initialization error:", error);
        setIsLoaded(true); // Still show background even if gradient fails
      }
    };

    // Start initialization after component mount
    const timer = setTimeout(initializeGradient, 50);
    
    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div 
      className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="gradient-background" />
    </div>
  );
};

export default GradientBackground;