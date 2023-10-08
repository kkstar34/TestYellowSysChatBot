import React from "react";
import AutoResizableTextarea from "./AutoResizableTextArea";
import { useDispatch, useSelector } from "react-redux";
import { SidebarSlice } from "../redux/slices/sidebar";
import axios from "axios";
import TypingEffect from "./TypingEffect";

function ChatBox() {
  const dispatch = useDispatch();
  const { showSidebar, showSmallSidebar } = SidebarSlice.actions;
  const hide = useSelector((state) => state.sidebar.close);

  const dataText = useSelector((state) => state.files.text);
  const baseUrl = useSelector((state) => state.files.baseUrl);

  function showSidebarFn() {
    dispatch(showSidebar());
  }

  function showSidebarSmallScreenFn() {
    dispatch(showSmallSidebar());
  }

  const downloadExcel = async (filename) => {
    try {
      const response = await axios.get(`${baseUrl}/download/${filename}`, {
        responseType: "blob", // Indiquez que la réponse est un blob (fichier binaire).
      });

      // Créez un objet URL à partir du blob et créez un lien de téléchargement.
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "exemple.xlsx");
      document.body.appendChild(link);
      link.click();

      // Libérez l'URL de l'objet blob après le téléchargement.
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier Excel", error);
    }
  };

  return (
    // chat-box-w-full
    <div className={!hide ? "chat-box " : "chat-box chat-box-w-full"}>
      <div className="chat-header">
        <div className="chat-menu-icon" onClick={showSidebarSmallScreenFn}>
          <i className="fa-solid fa-bars icon-bars"></i>
        </div>
        <div
          className={
            !hide
              ? "open-sidebar-icon open-sidebar-icon-hide"
              : "open-sidebar-icon "
          }
          onClick={showSidebarFn}
        >
          <i
            className="fa-regular fa-closed-captioning"
            style={{ color: "#ffffff" }}
          ></i>
        </div>
        <div className="model-box">
         <span>Default (GPT-3.5)</span>
        </div>
        <div className="model-box">
         <span><i className="fa-solid fa-arrow-up-from-bracket"></i></span>
        </div>
      </div>

      <div className="chat-content">
        {dataText && dataText.map((elt, i) => {
          return (
            <div key={i}>
              { elt.mine ? (
                <div className="response-row" >
                  <div className="avatar">
                    <img src="assets/images/user-avatar.png" alt="" />
                  </div>
                  <div className="response-text">
                    <span>{elt.data } </span>
                  </div>
                </div>
              ) : (
                <div className="response-row" >
                  <div className="avatar">
                    <img src="assets/images/chat-avatar.png" alt="" />
                  </div>

                  <div className="response-text">
                    <p>
                      <TypingEffect
                        text={`La génération du fichier Excel a été effectuée avec succès. 
                        Vous pouvez télécharger le fichier à partir du lien suivant : <span id=download-${i} class="download">Télécharger <i className="fa-solid fa-download"></i></span>`}
                        speed={15}
                        downloadExcel = {downloadExcel}
                        filename = {elt.data}
                        delay = {elt.elapsedTime}
                        id = {i}
                      />
                    </p>

                  
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      
      <div className="chat-footer">
        <div className="textarea-box">
          <AutoResizableTextarea />
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
