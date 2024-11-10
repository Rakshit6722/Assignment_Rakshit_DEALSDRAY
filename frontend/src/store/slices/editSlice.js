import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    edit:false
}

const editSlice = createSlice({
    name:"edit",
    initialState,
    reducers:{
        setEdit(state,value){
            state.edit = value.payload
        }
    }
})

export const {setEdit} = editSlice.actions

export default editSlice.reducer
