import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// local import
import todosReducer from './slices/todoSlice'
import authReducer from './slices/authSlice'

// create Redux store
export const store = configureStore({
  // register reducers
  reducer: {
    todos: todosReducer,
    auth: authReducer
  },
})

// extract RootState type from the store
export type RootState = ReturnType<typeof store.getState>

// extract AppDispatch type from the store
export type AppDispatch = typeof store.dispatch

// typed version of useDispatch for use in components
// this make sure dispatching actions (including thunks) is fully type-safe
export const useAppDispatch = () => useDispatch<AppDispatch>()

// typed version of useSelector for accessing state in components
// avoids needing to manually type state every time
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export store as the default export
// so it can be easily used in <Provider store={store}> in App.tsx
export default store