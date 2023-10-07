import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFileThunk } from "../redux/slices/files";
import "./Input.css";

function AutoResizableTextarea() {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const loading = useSelector((state) => state.files.loading);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const ajusterHauteurTextarea = (element) => {
    element.style.height = "auto"; // Réinitialiser la hauteur à "auto" pour mesurer correctement le scrollHeight
    if (element.value.length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
    element.style.height = element.scrollHeight + "px";
  };

  const handleUpload = async () => {
    if (!selectedFile ) {
      alert("Veuillez sélectionner un fichier Excel.");
      return;
    }

    if (!value ) {
      alert("Veuillez ecrire votre demande");
      return;
    }

    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
  
    if (fileExtension == 'xlsx' || fileExtension=="cvs") {

    const formData = new FormData();
    formData.append("excelFile", selectedFile);
    formData.append("requestText", value);
    dispatch(postFileThunk(formData, value));
    setValue("");
    setSelectedFile(null);

    }else{
        alert('Ce test ne prend en compte que les fichier xslx ou csv');
        return;
    }
  };

  return (
    <div className="textarea-container">
      <textarea
        className="input-text"
        placeholder="Send a message"
        rows="1"
        cols="10"
        value={value}
        onInput={(e) => ajusterHauteurTextarea(e.target)}
        onChange={handleChange}
      />

      <div className="button-group">
        <div className="input-file-container">
          <input
            type="file"
            id="customFileInput"
            onChange={handleFileChange}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
          <label htmlFor="customFileInput">
            <i className="fas fa-upload icon-sidebar-footer"></i>
          </label>
        </div>
        {loading ? (
          <div className="spinner">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : (
          <div
            className={active ? "icon-send active" : "icon-send"}
            onClick={handleUpload}
          >
            <i className="fa-regular fa-paper-plane icon-sidebar-footer"></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default AutoResizableTextarea;
