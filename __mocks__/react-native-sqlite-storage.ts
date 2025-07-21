/* 
Mock function for 'executeSql'.
This is the function we will use in our assertions like expect().toHaveBeenCalledWith()
*/

// jest.fn() is a mock function provided by Jest
const mockExecuteSql = jest.fn();

// Mock database object that contains 'executeSql' method
const mockDb = {
  executeSql: mockExecuteSql,
};

// In real SQLite, 'openDatabase' opens the database and takes a success callback.
// Here, we will simulate that behavior by calling the success callback and returning a mock DB object.
const openDatabase = jest.fn((_config, successCb) => {
  successCb?.(); // simulate successful opening
  return Promise.resolve(mockDb); // return our mocked DB
});

// Jest will replace 'react-native-sqlite-storage' with this mock.
export default {
  // SQLite allows enabling promises globally
  enablePromise: jest.fn(),

  // our mocked openDatabase function
  openDatabase,

  // used in tests for asserting calls
  __mockExecuteSql: mockExecuteSql,

  __mockDb: mockDb,
};
