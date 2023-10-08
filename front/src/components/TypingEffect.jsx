import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed,downloadExcel , filename , delay, id }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);


 

  function bindLink () {
    const a = document.querySelector(`#download-${id}`);
    console.log('function bindLink')
    console.log(a)
    if(a){
          a.addEventListener('click', downloadEx)
      }
    }


  function downloadEx(){
    console.log('click');
    return downloadExcel(filename);
  }

 

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
      else {
        clearInterval(typingInterval);
        bindLink()
      }
    }, speed);
    return () => {
      // unBindLink();
      clearInterval(typingInterval);
    };

  }, [text, currentIndex, speed]);


  useEffect(() => {
    return ()=>{
      // unBindLink();
    }
  }, []);




  return <span style={{ lineHeight: "1.8" }} dangerouslySetInnerHTML={{ __html: displayText }}   /> ;
};

export default TypingEffect;
