import {createSlice} from '@reduxjs/toolkit'

const initialState={
    Order: null
}
export const itemSlice = createSlice({
    name:'item',
    initialState,
    reducers: {
        reset:(state)=>{
            state.Order = null
        },
        setNextOrder:(state, actions)=>{
            state.Order = actions.payload
        }
    }
})

export const {reset, setNextOrder} = itemSlice.actions
export default itemSlice.reducer