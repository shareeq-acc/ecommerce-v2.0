import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface authState {
    name: string | null,
    token: string | null
}
type StateType = {
    auth:authState
}

const initialState = { name: null, token: null } as authState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ name: string, token: string }>) {
            state.name = action.payload.name
            state.token = action.payload.token
        },
        defaultState: (state) => {
            state = initialState;
        }
    },
})

export const { setUser, defaultState } = authSlice.actions
export default authSlice.reducer
export const selectToken = (state:StateType) => state.auth.token