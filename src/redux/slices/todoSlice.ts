import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// local imports
import { fetchTodosFromDB, addTodoInDB, updateTodoInDB, deleteTodoFromDB } from '../../data/LocalDatabase'
import { TodoModel } from '../../data/models/TodoModel'

/*
  define the shape of the todos state.
  holds a list of TodoModel objects.
 */
interface TodoState {
    todos: TodoModel[]
}

// initial state with an empty list of todos
const initialState: TodoState = {
    todos: [],
}

/*
Async Thunks: These handle side effects (database operations) and return
values to be processed by extraReducers when fulfilled.
*/

/*
    fetchTodos: Fetch all todos from the local SQLite database.
    return list of TodoModel objects.
*/
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    return await fetchTodosFromDB()
})

/*
    addTodo: Add a new todo to the SQLite database.
    return the same todo so it can be added to the Redux state.
*/
export const addTodo = createAsyncThunk('todos/addTodo', async (todo: TodoModel) => {
    await addTodoInDB(todo)
    return todo
})

/*
    updateTodo: Update an existing todo in the database.
    return the updated todo so it can replace the old version in Redux state.
*/
export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo: TodoModel) => {
    await updateTodoInDB(todo)
    return todo
})

/*
    deleteTodo: Delete a todo from the database by ID.
    return the deleted todo's ID so it can be removed from the state.
*/
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
    await deleteTodoFromDB(id)
    return id
})

// combine reducer logic and action creators for todos.
// respond to async thunk result using extraReducers.
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    // extraReducers allows us to handle the result of async thunks
    extraReducers: builder => {
        builder
            // when fetchTodos is fulfilled, update the state with the fetched todos.
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<TodoModel[]>) => {
                state.todos = action.payload
            })
            // when addTodo is fulfilled, insert the new todo at the top of the list.
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoModel>) => {
                state.todos.unshift(action.payload)
            })
            // when updateTodo is fulfilled, replace the todo with the updated version.
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<TodoModel>) => {
                state.todos = state.todos.map(todo =>
                    todo.id === action.payload.id ? action.payload : todo
                )
            })
            // when deleteTodo is fulfilled, filter out the todo with the given ID.
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
            })
    },
})

export default todoSlice.reducer