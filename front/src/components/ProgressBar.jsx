import React from "react";
import { useSelector } from "react-redux";


function ProgressBar({fileName, fileSize}) {
    const progress = useSelector((state) => Math.floor(state.files.progress));
  return (
    <>
    {progress === 100 ? <section className="uploaded-area">
        <li className="row">
          <div className="content upload">
            <i className="fas fa-file-alt"></i>
            <div className="details">
              <span className="area__name">{fileName} • Uploaded</span>
              <span className="size"> {fileSize} </span>
            </div>
          </div>
          <div>
          <i className="fas fa-check"></i>
          </div>
       
        </li>
      </section> : <section className="progress-area">
        <li className="row">
          <i className="fas fa-file-alt"></i>
          <div className="content">
            <div className="details">
              <span className="progress-area__name">
                {fileName} • Uploading
              </span>
              <span className="percent"> {progress + "%"} </span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: progress + "%" }}></div>
            </div>
          </div>
        </li>
      </section>}
      
      
    </>
  );
}

export default ProgressBar;
