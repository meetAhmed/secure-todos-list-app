import { fetchTodosFromDB, addTodoInDB } from '../src/data/LocalDatabase'
import { TodoModel } from '../src/data/models/TodoModel'

import SQLite from 'react-native-sqlite-storage';

/* 
We need to use 'as any' to bypass TypeScript type checking, so we can access our mock methods
like '__mockExecuteSql' which does not exist in the actual type definition.
This is safe here because we mock the whole module with Jest.
*/
const mockedSQLite = SQLite as any;

// use our custom mock for "react-native-sqlite-storage" from "__mocks__/react-native-sqlite-storage.ts"
jest.mock('react-native-sqlite-storage');

describe('LocalDatabase (mock)', () => {

  // reset the call history of the mock before each test
  beforeEach(() => {
    mockedSQLite.__mockExecuteSql.mockReset();
  });

  it('should insert a todo into the database', async () => {
    // todo to insert
    const todo: TodoModel = {
      id: '1',
      text: 'Test Todo',
      date: 'Sun, 20 July 2025'
    };

    // calling the function we are testing
    await addTodoInDB(todo);

    // check if mocked SQL function was called with the expected INSERT statement and values
    expect(mockedSQLite.__mockExecuteSql).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO'),
      [todo.id, todo.text, todo.date]
    );
  });

  it('should fetch todos from the database', async () => {
    // mock the result of a SELECT query by (sample response from the database)
    mockedSQLite.__mockExecuteSql.mockResolvedValueOnce([
      {
        rows: {
          length: 1,
          item: (index: number) => ({
            id: '1',
            text: 'Test Todo',
            date: 'Sun, 20 July 2025'
          }),
        },
      },
    ]);

    // calling the function we are testing
    const todos = await fetchTodosFromDB();

    // check returned data matches the mocked data
    expect(todos).toEqual([
      {
        id: '1',
        text: 'Test Todo',
        date: 'Sun, 20 July 2025'
      },
    ]);
  });
});