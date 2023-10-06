
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SidebarSlice } from '../redux/slices/sidebar';

function Sidebar() {

  const dispatch = useDispatch();
  const {hideSidebar} = SidebarSlice.actions;
  const hide = useSelector(state => state.sidebar.close);
  function closeSidebar() {
    dispatch(hideSidebar());
  }

  return (
    /*aside-close*/
    <>
    <div className={ !hide ? "aside" : "aside aside-close"}> 
      <div className="sidebar-container">
        <div className="sidebar-header">
            <div className="row">
                <div className="new-chat">
                  <div className="icon-plus">
                    <i className="fa-solid fa-plus fa-1x"></i>
                  </div>
                  <div className="text">
                    <span className="new-chat-text">New chat</span>
                  </div>
                </div>

                <div className="close-sidebar-icon" onClick={closeSidebar}>
                  <i className="fa-regular fa-closed-captioning" style={{color: "#ffffff"}}></i>
                </div>
            </div>
        </div>
        <div className="sidebar-body">
          <p className="body-description">
            History is temporarily unavailable. We're working to restore this feature as soon as possible. 
          </p>
        </div>
        <div className="sidebar-footer">
            <div className="items">
              <div className="item">
                <div className="icon">
                  <i className="fa-regular fa-moon icon-sidebar-footer" ></i>
                </div>

                <div className="name">
                  <span>Dark mode</span>
                </div>
              </div>

              <div className="item">
                <div className="icon">
                  <i className="fa-regular fa-user icon-sidebar-footer" ></i>
                </div>

                <div className="name">
                  <span>My account</span>
                </div>
              </div>

              <div className="item">
                <div className="icon">
                <i className="fa-solid fa-pen-fancy icon-sidebar-footer"></i>
                </div>

                <div className="name">
                  <span>Updates & FAQ</span>
                </div>
              </div>

                <div className="item">
                <div className="icon">
                <i className="fa-solid fa-right-from-bracket  icon-sidebar-footer" ></i>
                </div>

                <div className="name">
                  <span>Log out</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar