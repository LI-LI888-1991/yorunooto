'use client';

import React, { useEffect, useState } from 'react';

interface StarProps {
    id: number;
    left: string;
    top: string;
    duration: string;
    delay: string;
}

const StarsBackground: React.FC = () => {
    const [stars, setStars] = useState<StarProps[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: `${2 + Math.random() * 3}s`,
            delay: `${Math.random() * 3}s`,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="stars-container">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        left: star.left,
                        top: star.top,
                        '--duration': star.duration,
                        '--delay': star.delay,
                    } as React.CSSProperties}
                />
            ))}
            <style jsx>{`
        .stars-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(to bottom, #0f0f1a, #16213e);
          overflow: hidden;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle var(--duration, 3s) infinite;
          animation-delay: var(--delay, 0s);
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
        </div>
    );
};

export default StarsBackground;
