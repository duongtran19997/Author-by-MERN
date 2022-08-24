//demo
import {configureStore} from "@reduxjs/toolkit";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";
import authReducer from "./auth/authSlice";



const Store = configureStore({
    reducer: {
        board: boardReducer,
        list: listReducer,
        auth:authReducer

    }
})

export default Store;