import { configureStore } from "@reduxjs/toolkit";
import editSlice from '../store/slices/editSlice'

const store = configureStore({
    reducer:{
        edit:editSlice
    }
})

export default store