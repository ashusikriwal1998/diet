import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { dataAPI } from "../Services";

const store = configureStore({
    reducer: {
        [dataAPI.reducerPath]: dataAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataAPI.middleware),
});

setupListeners(store.dispatch)

export default store
