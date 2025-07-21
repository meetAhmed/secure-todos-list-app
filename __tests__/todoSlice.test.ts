import todoReducer, {
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} from '../src/redux/slices/todoSlice';

import { TodoModel } from '../src/data/models/TodoModel';

// mock the database functions used in async thunks
jest.mock('../src/data/LocalDatabase', () => ({
    fetchTodosFromDB: jest.fn(),
    addTodoInDB: jest.fn(),
    updateTodoInDB: jest.fn(),
    deleteTodoFromDB: jest.fn(),
}));

describe('todoSlice', () => {
    // sample todo object
    const mockTodo: TodoModel = {
        id: '1',
        text: 'Test Todo',
        date: 'Sun, 20 July 2025'
    };

    // reset the call history of the mock before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the initial state', () => {
        // call reducer with undefined state and dummy action
        // should return initial state
        const state = todoReducer(undefined, { type: '' });

        // returned state should match the initial state defined in the slice
        expect(state).toEqual({ todos: [] });
    });

    it('should handle fetchTodos.fulfilled', () => {
        // simulate fulfilled action dispatched by the fetchTodos async thunk
        const action = {
            type: fetchTodos.fulfilled.type,
            payload: [mockTodo],
        };

        // call reducer with initial state and the simulated action
        const state = todoReducer(undefined, action);

        // state should have mock todo
        expect(state.todos).toHaveLength(1);
        expect(state.todos[0]).toEqual(mockTodo);
    });

    it('should handle addTodo.fulfilled', () => {
        // simulate fulfilled action dispatched by the addTodo async thunk
        const action = {
            type: addTodo.fulfilled.type,
            payload: mockTodo,
        };

        // call reducer with empty todos and the action
        const state = todoReducer({ todos: [] }, action);

        // state should have mock todo
        expect(state.todos[0]).toEqual(mockTodo);
    });

    it('should handle updateTodo.fulfilled', () => {
        // update mockTodo
        const updatedTodo = { ...mockTodo, text: 'Updated Title' };

        // simulate fulfilled action dispatched by the updateTodo thunk
        const action = {
            type: updateTodo.fulfilled.type,
            payload: updatedTodo,
        };

        // call reducer with an existing todo and simulate update action
        const state = todoReducer({ todos: [mockTodo] }, action);

        // state should have updated mock todo
        expect(state.todos[0].text).toBe('Updated Title');
    });

    it('should handle deleteTodo.fulfilled', () => {
        // simulate fulfilled action dispatched by deleteTodo thunk
        const action = {
            type: deleteTodo.fulfilled.type,
            payload: mockTodo.id,
        };

        // call reducer with a single todo and simulate deletion
        const state = todoReducer({ todos: [mockTodo] }, action);

        // state should not have any todo
        expect(state.todos).toHaveLength(0);
    });
});
