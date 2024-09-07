import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {authService} from '../services/authService'

const initialState = {
    loading: false,
    sucess: false,
    error: false,
    token: null,
    user: null
}

export const register = createAsyncThunk('auth/register', 
    async ({userObject}, TrunkAPI)=>{
        try {
            const res = await authService.register(userObject)
            return res
        } catch (err) {
            return TrunkAPI.rejectWithValue(err)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth', initialState,
    reducers:{
        reset:(state)=>{
            state.error = false
            state.sucess = false
            state.loading = false
        }
    },
    extraReducers: ( builder )=>{
        builder
            .addCase(register.pending, (state)=>{
                state.loading = true
                state.sucess = false
                state.error = false
            })
            .addCase(register.rejected, (state, action)=>{
                state.loading = false
                state.sucess = false
                state.error = action.payload
            })
            .addCase(register.fulfilled, (state, action)=>{
                state.token = action.payload
                state.sucess = true
                state.error = false
                state.loading = false
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer