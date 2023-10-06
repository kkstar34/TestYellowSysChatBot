import React, { useState } from 'react';


function AutoResizableTextarea() {
 
  const [active,setActive] = useState(false);
  const [valeur, setValeur] = useState('');

  // const handleChange = (event) => {
  //   event.target.style.height = 'auto'; 
  //   setTextareaHeight(`${event.target.scrollHeight}px`);
  //   setActive(true);
  // };

  const handleChange = (e) => {
    const nouvelleValeur = e.target.value;
    setValeur(nouvelleValeur);
  };

  const ajusterHauteurTextarea = (element) => {
    element.style.height = 'auto'; // Réinitialiser la hauteur à "auto" pour mesurer correctement le scrollHeight
    if(element.value.length > 0){
      setActive(true);
    }
    else {
      setActive(false);
    }
    element.style.height = element.scrollHeight + 'px';
    console.log(element.style.height);  
    
    
  };

  return (
    <div className="textarea-container">
      <textarea
        className='input-text'
        placeholder="Send a message"
        rows="1" 
        cols = "10"
        value={valeur}
        onInput={(e) => ajusterHauteurTextarea(e.target)}
        onChange={handleChange}
      />

    <div className='button-group'>
      <div className="input-file-container">
          <input type="file" id="customFileInput" />
          <label htmlFor="customFileInput">
              <i className="fas fa-upload"></i>
          </label>
        </div>
        <div className={active ? 'icon-send active' : 'icon-send'}>
          <i className="fa-regular fa-paper-plane icon-sidebar-footer" ></i>
      </div>
    </div>
      
    </div>
  );
}

export default AutoResizableTextarea;
