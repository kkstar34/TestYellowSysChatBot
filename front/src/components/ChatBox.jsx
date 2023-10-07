import React from 'react'
import AutoResizableTextarea from './AutoResizableTextArea'
import { useDispatch, useSelector } from 'react-redux';
import { SidebarSlice } from '../redux/slices/sidebar';

function ChatBox() {

  const dispatch = useDispatch();
  const {showSidebar, showSmallSidebar} = SidebarSlice.actions;
  const hide = useSelector(state => state.sidebar.close);

  const dataText = useSelector(state => state.files.text);
  console.log(dataText);
  
  function showSidebarFn() {
    dispatch(showSidebar());
  }

  function showSidebarSmallScreenFn() {
    dispatch(showSmallSidebar());
  }


  return (
    // chat-box-w-full
    <div className={!hide ? "chat-box " : "chat-box chat-box-w-full" }>
      <div className="chat-header">
          <div className="chat-menu-icon" onClick={showSidebarSmallScreenFn}> <i className="fa-solid fa-bars icon-bars"></i> </div>
          <div className={!hide ? "open-sidebar-icon open-sidebar-icon-hide" : "open-sidebar-icon "} onClick={showSidebarFn} >
            <i className="fa-regular fa-closed-captioning" style={{color: "#ffffff"}}></i>
          </div>
          <div className="model-box"></div>
      </div>

      <div className="chat-content">

      </div>

      <div className="chat-footer">
        <AutoResizableTextarea/>
      </div>

    </div>
  )
}

export default ChatBox