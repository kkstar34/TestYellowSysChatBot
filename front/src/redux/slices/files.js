import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";




var baseUrl = "https://back-with-nest.vercel.app";
// var baseUrl ="http://127.0.0.1:4000";

const initialState = 
    {
       baseUrl : baseUrl,
       link : '',
       loading : false,
       text : [],
       progress : 0,
    }

export const fileSlice = createSlice({
    name : 'File',
    initialState,
    reducers : {
        postFile : (state, {payload}) => {
            state.loading = true;
            const textArray = state.text;
            state.text = [...textArray, payload];
         
        },
        postFileInProgess : (state, {payload}) => {
            state.progress = payload
        },

        postFileSuccess : (state, {payload}) => {
            state.loading = false;
            const textArray = state.text;
            state.text = [...textArray, payload];
        },

        postFileFailure : (state, {payload}) => {
            state.loading = false;
            const textArray = state.text;
            state.text = [...textArray, payload];
        },
      
    }

})

const {postFile,postFileInProgess, postFileSuccess, postFileFailure} = fileSlice.actions;

export const postFileThunk = (data, text) => {
    return async (dispatch) => {
        const dataSend = {
            mine : true,
            data : text
        }
        dispatch(postFile(dataSend));
        const startTime = performance.now();
        try {
            const response = await axios.post(`${baseUrl}/upload`, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    dispatch(postFileInProgess(progress));
                }
        });

        // console.log("succès : requete envoyée avec succès")
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        const dataResponse = {
            mine : false,
            data : response.data,
            elapsedTime : elapsedTime
        }
        dispatch(postFileSuccess(dataResponse));

        }

        catch (err) {
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            const dataResponse = {
                mine : false,
                data : err.message,
                elapsedTime : elapsedTime
            }
            dispatch(postFileFailure(dataResponse));
        }

        
    }

}


export default fileSlice.reducer;