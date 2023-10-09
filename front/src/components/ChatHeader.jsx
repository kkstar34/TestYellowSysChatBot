import React, { useEffect, useState } from "react";
import { SidebarSlice } from "../redux/slices/sidebar";
import { useDispatch, useSelector } from "react-redux";

function ChatHeader() {
  const dispatch = useDispatch();
  const hide = useSelector((state) => state.sidebar.close);
  const { showSidebar, showSmallSidebar } = SidebarSlice.actions;
  function showSidebarFn() {
    dispatch(showSidebar());
  }

  function showSidebarSmallScreenFn() {
    dispatch(showSmallSidebar());
  }

  const [isHeaderVisible, setHeaderVisible] = useState(true);
 
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const chatBox = document.querySelector('.chat-content');
    const handleScroll = () => {
      const currentScrollPos = chatBox.scrollTop;
      const isScrolledDown = prevScrollPos < currentScrollPos;

      setHeaderVisible(!isScrolledDown);
      setPrevScrollPos(currentScrollPos);
    
    };

    
    chatBox.addEventListener('scroll', handleScroll);

    return () => {
        chatBox.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);


  useEffect(() => {
    
    const chatBox = document.querySelector('.chat-content');
    if(isHeaderVisible){
        chatBox.style.height = "73%";
    }else{
        chatBox.style.height = "83%";
    }
    

  }, [isHeaderVisible])


  return (
    <div className={isHeaderVisible ? "chat-header" : "chat-header hidden"}>
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
        <i className="fa-regular fa-closed-captioning open-sidebar-icon-i"></i>
      </div>
      <div className="model-box">
        <span>Default (GPT-3.5)</span>
      </div>
      <div className="model-box">
        <span>
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
        </span>
      </div>
    </div>
  );
}

export default ChatHeader;
