import React, { useRef } from 'react'

const StartField = () => {
    const NUM_DOTS = 60;

  const dots = useRef(
      Array.from({ length: NUM_DOTS }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      }))
    );
  
    return (
      <div className="starfield">
        {dots.current.map((dot:any) => (
          <span
            key={dot.id}
            className="star-dot"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>
    );
}

export default StartField
