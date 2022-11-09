import { configureStore } from "@reduxjs/toolkit";
import furnitureSlice from "./furnitureSlice";

export default configureStore({
    reducer: {
        furniture: furnitureSlice,
    },
})