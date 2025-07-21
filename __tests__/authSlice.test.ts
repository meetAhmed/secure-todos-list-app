import authReducer, { setAuthState } from '../src/redux/slices/authSlice';

describe('authSlice', () => {
    it('should handle setAuthState(true)', () => {
        // set isAuthenticated as false in the previous state 
        const previousState = { isAuthenticated: false };

        // dispatch action setAuthState(true)
        const newState = authReducer(previousState, setAuthState(true));

        // new state should be { isAuthenticated: true }
        expect(newState).toEqual({ isAuthenticated: true });
    });

    it('should handle setAuthState(false)', () => {
        // set isAuthenticated as true in the previous state 
        const previousState = { isAuthenticated: true };

        // dispatch action setAuthState(false)
        const newState = authReducer(previousState, setAuthState(false));

        // new state should be { isAuthenticated: false }
        expect(newState).toEqual({ isAuthenticated: false });
    });
});
