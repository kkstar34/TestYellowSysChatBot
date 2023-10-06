import { createSlice } from "@reduxjs/toolkit";

const initialState = 
    {
        close: false,
        smallClose : true,
    }

export const SidebarSlice = createSlice({
    name : 'Sidebar',
    initialState,
    reducers : {
        hideSidebar : (state, {payload}) => {
            state.close = true;
        },

        showSidebar : (state, {payload}) => {
            state.close = false;
        },

        hideSmallSidebar : (state, {payload}) => {
            state.smallClose = true;
        },

        showSmallSidebar : (state, {payload}) => {
            state.smallClose = false;
        }
      
    }

})




export default SidebarSlice.reducer;