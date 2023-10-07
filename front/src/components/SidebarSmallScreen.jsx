
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SidebarSlice } from '../redux/slices/sidebar';
import { createPortal } from 'react-dom';

function SidebarSmallScreen() {

  //i must do with click away
  const dispatch = useDispatch();
  const {hideSmallSidebar} = SidebarSlice.actions;
  const hide = useSelector(state => state.sidebar.smallClose);
  function closeSidebar() {
    dispatch(hideSmallSidebar());
  }

  return (
    /*aside-close*/
    createPortal(
      <>
      <div className={ hide ? "aside-small" : "aside-small aside-small-show"}> 
        <div className="sidebar-container">
          <div className="sidebar-header">
              <div className="row">
                  <div className="new-chat-small">
                    <div className="icon-plus">
                      <i className="fa-solid fa-plus fa-1x"></i>
                    </div>
                    <div className="text">
                      <span className="new-chat-small-text">New chat</span>
                    </div>
                  </div>
                  <div className="close-small-sidebar-icon"onClick={closeSidebar} >
                    <i className="fa-solid fa-xmark " style={{color: "#ffffff"}}></i>
                  </div>
              </div>
          </div>
          <div className="sidebar-body-small">
            <p className="body-description">
              History is temporarily unavailable. We're working to restore this feature as soon as possible. 
            </p>
          </div>
      
          <div className="sidebar-small-footer">
              <div className="items-small">
                <div className="item-small">
                  <div className="icon">
                    <i className="fa-regular fa-moon icon-sidebar-small-footer" ></i>
                  </div>
  
                  <div className="name-small">
                    <span>Dark mode</span>
                  </div>
                </div>
  
                <div className="item">
                  <div className="icon">
                    <i className="fa-regular fa-user icon-sidebar-small-footer" ></i>
                  </div>
  
                  <div className="name-small">
                    <span>My account</span>
                  </div>
                </div>
  
                <div className="item">
                  <div className="icon">
                  <i className="fa-solid fa-pen-fancy icon-sidebar-small-footer"></i>
                  </div>
  
                  <div className="name-small">
                    <span>Updates & FAQ</span>
                  </div>
                </div>
  
                  <div className="item">
                  <div className="icon">
                  <i className="fa-solid fa-right-from-bracket  icon-sidebar-small-footer" ></i>
                  </div>
  
                  <div className="name-small">
                    <span>Log out</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      </>,
      document.querySelector('#portal')
    )

    
  )
}

export default SidebarSmallScreen