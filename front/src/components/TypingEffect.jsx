import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed,downloadExcel , filename , delay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, currentIndex, speed]);

  return <span style={{ lineHeight: "1.8" }}>{displayText} <a href="#dowload" onClick={(e)=>{
    e.preventDefault();
    return downloadExcel(filename);
  }}><span>Télécharger <i className="fa-solid fa-download"></i></span></a> | eta : {delay} (ms) </span>;
};

export default TypingEffect;
