import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import globalErrorsReducer from "./slices/globalErrorsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        globalErrors: globalErrorsReducer
    }
})