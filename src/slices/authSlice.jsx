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
    async ({userObject, setToken}, TrunkAPI)=>{
        try {
            const res = await authService.register(userObject, setToken)
            return res
        } catch (err) {
            return TrunkAPI.rejectWithValue(err)
        }
    }
)
export const login = createAsyncThunk('auth/login', 
    async ({userObject, setToken}, TrunkAPI)=>{
        try {
            const res = await authService.login(userObject, setToken)
            return res
        } catch (err) {
            return TrunkAPI.rejectWithValue(err)
        }
    }
)


export const getAuthUser = createAsyncThunk('auth/authuser', 
    async ({token}, TrunkAPI)=>{
        try {
            const res = await authService.getAuthUser(token)
            return res
        } catch (err) {
            return TrunkAPI.rejectWithValue(err)
        }
    }
)
export const editUser = createAsyncThunk('auth/update', 
    async ({uid=null, token, body, setToken}, TrunkAPI)=>{
        try {
            const res = await authService.updateUser(body, token, uid, setToken)
            return res
        } catch (err) {
            return TrunkAPI.rejectWithValue(err)
        }
    }
)
export const removeUser = createAsyncThunk('auth/delete', 
    async ({uid=null, token}, TrunkAPI)=>{
        try {
            const res = await authService.deleteUser(token, uid)
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
        },
        resetUser:(state)=>{
            state.user = null
            state.token = null
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
            .addCase(login.pending, (state)=>{
                state.loading = true
                state.sucess = false
                state.error = false
            })
            .addCase(login.rejected, (state, action)=>{
                state.loading = false
                state.sucess = false
                state.error = action.payload
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.token = action.payload
                state.sucess = true
                state.error = false
                state.loading = false
            })

            .addCase(getAuthUser.pending, (state)=>{
                state.loading = true
                state.sucess = false
                state.error = false
            })
            .addCase(getAuthUser.rejected, (state, action)=>{
                state.loading = false
                state.sucess = false
                state.error = action.payload
            })
            .addCase(getAuthUser.fulfilled, (state, action)=>{
                state.user = action.payload
                state.sucess = true
                state.error = false
                state.loading = false
            })

            .addCase(editUser.pending, (state)=>{
                state.loading = true
                state.sucess = false
                state.error = false
            })
            .addCase(editUser.rejected, (state, action)=>{
                state.loading = false
                state.sucess = false
                state.error = action.payload
            })
            .addCase(editUser.fulfilled, (state, action)=>{
                state.token = action.payload
                state.sucess = true
                state.error = false
                state.loading = false
            })
            .addCase(removeUser.pending, (state)=>{
                state.loading = true
                state.sucess = false
                state.error = false
            })
            .addCase(removeUser.rejected, (state, action)=>{
                state.loading = false
                state.sucess = false
                state.error = action.payload
            })
            .addCase(removeUser.fulfilled, (state)=>{
                state.user = null
                state.token = null
                state.sucess = true
                state.error = false
                state.loading = false
            })
    }
})

export const {reset, resetUser} = authSlice.actions
export default authSlice.reducer