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
        <div className="model-box"></div>
      </div>

      <div className="chat-content">
        {dataText && dataText.map((elt,id) => {
          return (
            <>
              { elt.mine ? (
                <div className="response-row" key={id}>
                  <div className="avatar">
                    <img src="assets/images/user-avatar.png" alt="" />
                  </div>
                  <div className="reponse-text">
                    <p>{elt.data}</p>
                  </div>
                </div>
              ) : (
                <div className="response-row" key={id}>
                  <div className="avatar">
                    <img src="assets/images/chat-avatar.png" alt="" />
                  </div>

                  <div className="reponse-text">
                    <p>
                      <TypingEffect
                        text={elt.data}
                        speed={15}
                      />

                      <span className="download-btn" onClick={(e)=>{
                        e.preventDefault();
                        return downloadExcel(elt.data);
                      }}>
                        <a href="#dowload" onClick={(e)=>{
                        e.preventDefault();
                        return downloadExcel(elt.data);
                      }}><span>Télécharger <i className="fa-solid fa-download"></i></span></a>
                      </span>
                    </p>

                  
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

      <div className="chat-footer">
        <AutoResizableTextarea />
      </div>
    </div>
  );
}

export default ChatBox;
