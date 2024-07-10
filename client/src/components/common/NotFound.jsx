import React, { useEffect, useState } from 'react';
import "../../assets/css/NotFound.css"

const NotFound = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        top: event.pageY,
        left: event.pageX,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='Container'> 
      <div className="text">
        <h1>404</h1>
        <h2>Uh, Ohh</h2>
        <h3>Sorry we can't find what you are looking for 'cuz it's so dark in here</h3>
      </div>
      <div 
        className="torch"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      ></div>
    </div>
  );
};

export default NotFound;
