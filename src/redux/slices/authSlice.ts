import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// define the shape of the authentication state.
// tracks if the user is authenticated or not.
type AuthState = {
    isAuthenticated: boolean;
}

// initially, the user is not authenticated.
const initialState: AuthState = {
    isAuthenticated: false,
}

// create a Redux slice named "auth" that manages authentication related state and reducers.
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // reducer to update the authentication state.
        // takes a boolean payload (`true` = logged in, `false` = logged out)
        setAuthState(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload
        }
    }
})

export const { setAuthState } = authSlice.actions
export default authSlice.reducer 