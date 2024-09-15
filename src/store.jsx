import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import globalErrorsReducer from "./slices/globalErrorsSlice";
import filtersReducer from "./slices/filtersSlice";
import itemReducer from "./slices/itemSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        globalErrors: globalErrorsReducer,
        filters: filtersReducer,
        item: itemReducer
    }
})